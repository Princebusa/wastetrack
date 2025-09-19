import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import axios from 'axios'
import Layout from "../layout/Layout";
import MinimalInput from "../components/input";
import toast from "react-hot-toast";
import trash from "../assets/trash.png"
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
import { Album02Icon, ArrowUp01Icon, Location03Icon, Cancel01Icon,Delete03Icon } from 'hugeicons-react'





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

const dump = new L.Icon({
  iconUrl: trash,
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


console.log(reports)

// Your new data
let newData = [
  {
    "lat": 21.1702,
    "lng": 72.8311,
    "type": "dump",
    "info": "Ring Road, Surat",
    "image": "https://english.loktej.com/media/2023-02/news-photo-(15).jpg"
  },
  {
    "lat": 21.1850,
    "lng": 72.8405,
    "type": "dump",
    "info": "Adajan, Surat",
    "image": "https://static.toiimg.com/thumb/msid-65170270,imgsize-120709,width-400,height-225,resizemode-72/65170270.jpg"
  },
  {
    "lat": 21.1605,
    "lng": 72.8502,
    "type": "dump",
    "info": "Varachha, Surat",
    "image": "https://im.indiatimes.in/facebook/2018/Jul/garbage_disposal_surat_gujarat_landfills_1530516274.jpg?w=1200&h=900&cc=1&webp=1&q=75"
  },
  {
    "lat": 21.1758,
    "lng": 72.8203,
    "type": "dump",
    "info": "Nanpura, Surat",
    "image": "https://images.indianexpress.com/2022/03/punjab-waste.jpg"
  },
  {
    "lat": 21.1901,
    "lng": 72.8359,
    "type": "dump",
    "info": "Athwa Gate, Surat",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgDdevewf1R723Ao9NbCXJ5QaKiR2iISz-Z-pz9ai0o389O5LKcSPnbbSVz1x83378ny4&usqp=CAU"
  },
  {
    "lat": 21.1555,
    "lng": 72.8250,
    "type": "dump",
    "info": "Rander, Surat",
    "image": "https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/medium/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYTRlNTM5N2IwLTBiOTEtMTFmMC05YTQ0LTIxMTA4MTFlOTA5YS5qcGc="
  },
  {
    "lat": 21.1659,
    "lng": 72.8455,
    "type": "dump",
    "info": "Katargam, Surat",
    "image": "https://static.toiimg.com/thumb/msid-116149376,imgsize-105312,width-400,height-225,resizemode-72/116149376.jpg"
  },
  {
    "lat": 21.1807,
    "lng": 72.8150,
    "type": "dump",
    "info": "Udhna, Surat",
    "image": "https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYWI0YjA5NGYwLTRlN2ItMTFlZi04MGUwLTg5MTBmNjk1YjZkZS5qcGc="
  },
  {
    "lat": 21.1502,
    "lng": 72.8400,
    "type": "dump",
    "info": "Parle Point, Surat",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHayswDM7qJvNd2sWVPRio7vfOtuLrAOgnFWeEsaNiXv2KFJbTTQn8FnWcAdzeNkO13jc&usqp=CAU"
  },
  {
    "lat": 21.2001,
    "lng": 72.8305,
    "type": "dump",
    "info": "Piplod, Surat",
    "image": "https://static.toiimg.com/thumb/msid-58696245,width-1280,height-720,resizemode-72/58696245.jpg"
  }
]


reports.push(...newData);


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
const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}get/allreports`, {
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
              {reports.map((r, id) => {
                const icon = r.type === 'dump' ? dump : otherUserIcon;
                return(
                <Marker  key={id} position={[r.lat, r.lng]} icon={icon}>
                  <Popup >{r.info}<img className="rounded-md mt-2" src={r.image} /></Popup>
                </Marker>
              )
              }
              )}

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
