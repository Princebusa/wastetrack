import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import axios from 'axios'
import Layout from "../layout/Layout";
import MinimalInput from "../components/input";
import toast from "react-hot-toast";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";
import { Album02Icon, ArrowUp01Icon, Location03Icon, Cancel01Icon } from 'hugeicons-react'





// Custom Icon for current user
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Custom Icon for other users
const otherUserIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

function LocationMarker({ setPosition, setTaskadd }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setTaskadd(true)
    },
  });

  return null;
}



export default function map() {
  const [position, setPosition] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [info, setInfo] = useState("");
  const [reports, setReports] = useState([]);
  const [taskadd, setTaskadd] = useState(false);
  const [loading, setLoading] = useState(false);
  const taskaddref = useRef(null);

  useGSAP(
    function () {
      if (!taskaddref.current) return;

      if (taskadd) {
        gsap.to(taskaddref.current, {
          opacity: 1,
          display: "flex",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: "rgba(0,0,0,0.4)",
          duration: 0.3,
        });
      } else {
        gsap.to(taskaddref.current, {
          opacity: 0,
          display: "none",
          duration: 0.3,
        });
      }
    },
    [taskadd]
  );





  useEffect(() => {

    const fetchReports = async () => {
      try {
const res = await axios.get("http://localhost:3000/api/get/allreports", {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}); // your API endpoint
       
        const apiData = res.data.data;

    const transformed = apiData.map((report, index) => ({
      id: report._id || index + 1,
      lat: report.location.coordinates[1], // latitude
      lng: report.location.coordinates[0], // longitude
      info: report.description,
      image: report.imageUrl,
      status: report.status,
      wasteType: report.wasteType,
    }));
        setReports(transformed);
      } catch (err) {
        console.error("Failed to load reports, using dummy data:", err);

        
      }
    };
    fetchReports();
  }, []);


  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
    setTaskadd(true);
  };


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!position || !photo || !info) {
      alert("Please select location, add photo & details!");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append('longitude', position?.lng);
    formDataToSend.append('latitude', position?.lat);
    formDataToSend.append('image', photo);
    formDataToSend.append('description', info);

    const idToken = localStorage.getItem('token');
    const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/report`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${idToken}`
      },
    });
if(data.success === true){
   toast.success("✅ Report submitted successfully!");
    setLoading(false);
}
    const newReport = {
      id: Date.now(),
      lat: position.lat,
      lng: position.lng,
      info,
    };
    setReports((prev) => [...prev, newReport]);
    setPosition(null);
    setTaskadd(false);
    setPhoto(null);
    setInfo("");
   
  };

  return (
    <Layout>
      <div className="flex flex-col">




        <div className="relative flex flex-col">
          <div className="mb-2  text-[16px]  flex justify-between items-center  ">
            <h3>Select Your Location</h3>
            <button
              onClick={handleCurrentLocation}
              className="cursor-pointer bg-[#5c8001] hover:bg-[#70911b] text-white text-[14px] rounded-md shadow-lg px-4 py-2  flex items-center  gap-2  transition"
            >
              <Location03Icon size={18} />
              Use My Location
            </button>
          </div>
          <div className="hover:shadow-xl h-[600px] p-1 bg-gradient-to-r from-[#fbb02d] via-[#7ba60b] via-[#9bcc2f] via-[#fbb02d] via-[#7ba60b] to-[#5c8001] overflow-hidden rounded-lg mt-2 shadow-lg">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              />

              {/* User marker */}
              {position && (
                <Marker position={position} icon={userIcon}>
                  <Popup>
                    Selected: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
                  </Popup>
                </Marker>
              )}

              {/* Other users' reports */}
              {reports.map((r) => (
                <Marker  key={r.id} position={[r.lat, r.lng]} icon={otherUserIcon}>
                  <Popup >{r.info}<img className="rounded-md mt-2" src={r.image} /></Popup>
                </Marker>
              ))}

              <LocationMarker setTaskadd={setTaskadd} setPosition={setPosition} />
            </MapContainer>

          </div>
          {/* Use My Location Button */}

        </div>

        {/* Report Form */}
        <div
          ref={taskaddref}
          className="hidden justify-center items-center relative bg-[rgba(245, 245, 245, 0.91)] backdrop-blur-2xl"
          style={{ opacity: 0 }}
        >

          <form
            onSubmit={handleSubmit}
            className="relative py-6 px-6 bg-white border-t shadow-lg space-y-3 border border-gray-200 rounded-[30px] w-full max-w-md"
          >

            <div className="absolute top-4 right-4 cursor-pointer text-white" onClick={() => setTaskadd(false)}>
              <Cancel01Icon size={18} color="black" />
            </div>


            <div className="flex items-center space-x-2">
              <Location03Icon className="text-green-600" />
              <span className="font-semibold">
                Selected Location: {position?.lat?.toFixed(4)}, {position?.lng?.toFixed(4)}
              </span>
            </div>

            <label className="flex items-center gap-2 border border-gray-200  p-2 rounded-lg cursor-pointer focus:shadow-md hover:bg-gray-50">
              <Album02Icon size={18} className="" />
              <span className="text-[13px] text-gray-500">{photo ? photo.name : "Upload Photo"}</span>
              <input
                className="outline-none border-0"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </label>

            <textarea
              className="w-full text-[13px] p-2 border border-gray-200 rounded-lg focus:border focus:border-gray-300 focus:shadow-md outline-none"
              rows="3"
              placeholder="Enter details about this wasteful place..."
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />

            <button
              type="submit"
              className="hover:shadow-lg cursor-pointer flex w-full hover:bg-[#70911b] text-white py-2 rounded-lg text-[14px] font-medium justify-center items-center bg-[#5c8001] transition"
            >
              { !loading == true ? "Submit Report" : "Submitting..."}<div className="rotate-90"><ArrowUp01Icon size={16} />
              </div>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
