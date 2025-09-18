
import { use } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {ArrowRight02Icon} from 'hugeicons-react'
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

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/report/update/complet/${reportId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Response:", data);
      alert("Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };



    return (
        <Layout>
            <div>
                <Link to="/app/allreports" className="hover:bg-gray-200 py-1 bg-gray-100 block w-[100px] rounded-md text-[13px] text-gray-900 flex justify-center font-medium flex items-center gap-1">
               <div className="rotate-180" > <ArrowRight02Icon/></div> Go Back
                </Link>
                <div className="flex gap-5 mt-5">

                    <div className="w-full border border-gray-200 rounded-lg shadow-sm p-4">
                        <img className="w-full h-84 object-cover rounded-md" src={data?.imageUrl} alt="" />
                        <div className="mt-4">
                            <div>
                                <div

                                    className={`px-3 py-[2px] rounded-lg w-fit text-[11px] font-medium ${statusColors[data?.status] || "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    Status : {data?.status}
                                </div>
                            </div>

                            <div className="mt-5">
                                <p className="text-[14px] text-medium">{data?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg shadow-sm p-4 w-[350px]">
                         <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Submit Report
        </h2>

        {/* Image Upload */}
        <label className="block mb-3 text-gray-600 font-medium">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-green-500"
        />

        {/* Description */}
        <label className="block mb-3 text-gray-600 font-medium">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
          rows="4"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-green-500"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default singleReport;