
import { use } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight02Icon, ArrowUp01Icon } from 'hugeicons-react'
const singleReport = () => {

  const statusColors = {
    reported: "bg-red-100 text-red-600 border border-red-300",
    "in-progress": "bg-yellow-100 text-yellow-600 border border-yellow-300",
    resolved: "bg-green-100 text-green-600 border border-green-300",
  };



  const params = useParams();
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const dateObj = new Date(data?.createdAt);

  // Format parts
  const date = dateObj.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  useEffect(() => {
    const fetchReport = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get/report/${params.reportid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setData(data.data)
    }
    fetchReport()
  }, [params.reportid]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description) {
      alert("Please upload an image and add a description.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("description", description);

      // const res = await fetch(
      //   `${import.meta.env.VITE_BACKEND_URL}/report/update/complet/${reportId}`,
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/report/update/complet/${params.reportid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });



      toast.success("✅ Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Error submitting report");

    } finally {
      setLoading(false);
    }
  };



  return (
    <Layout>
      <div>
        <Link to="/app/allreports" className="hover:bg-gray-200 py-1 bg-gray-100 block w-[100px] rounded-md text-[13px] text-gray-900 flex justify-center font-medium flex items-center gap-1">
          <div className="rotate-180" > <ArrowRight02Icon /></div> Go Back
        </Link>
        <div className="flex gap-5 mt-5 items-start ">

          <div className="w-full border border-gray-200 rounded-lg shadow-sm p-4">
            <img className="w-full h-84 object-cover rounded-md" src={data?.imageUrl} alt="" />
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <div

                    className={`px-3 py-[2px] rounded-lg w-fit text-[11px] font-medium ${statusColors[data?.status] || "bg-gray-100 text-gray-600"
                      }`}
                  >
                    Status : {data?.status}
                  </div>
                </div>
                <div className="flex gap-3 justify-center items-center">
                  <p className="text-[14px]">Created on:</p>
                  <p className="text-[14px]">{date}</p>
                  <p className="text-[14px]">{time}</p>
                </div>
              </div>
              <div className="mt-5">
<p>Description By Creater</p>
                <p className="pt-2 text-[14px] text-gray-600 text-medium">{data?.description}</p>
              </div>
            </div>
          </div>


          <div className="border border-gray-200 rounded-lg shadow-sm p-4 w-[350px]">
            <form
              onSubmit={handleSubmit}
              className="bg-white  rounded-2xl w-full "
            >
              <h2 className="border-b border-gray-200 text-xl font-bold mb-4 pb-2 text-center text-gray-900">
                Close This Report
              </h2>

              {/* Image Upload */}
              <label className="block mb-3 text-[15px] text-gray-600 font-medium">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-[14px] border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-green-500"
              />

              {/* Description */}
              <label className="text-[15px] block mb-3 text-gray-600 font-medium">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
                rows="4"
                className="text-[14px] w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-green-500"
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="hover:shadow-lg cursor-pointer flex w-full hover:bg-[#70911b] text-white py-2 rounded-lg text-[14px] font-medium justify-center items-center bg-[#5c8001] transition"
              >
                {loading ? "Submitting..." : "Close Report"}<div className="rotate-90"><ArrowUp01Icon size={16} />
                </div>
              </button>
            </form>


          </div>
        </div>
      </div>
    </Layout>
  )
}

export default singleReport;