import { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import  axios from 'axios';
import {AddCircleHalfDotIcon} from 'hugeicons-react'
import { Link } from 'react-router-dom';
const mymarks = ()=>{
const [data, setData] = useState([]);
const statusColors = {
  reported: "bg-red-100 text-red-600 border border-red-300",
  "in-progress": "bg-yellow-100 text-yellow-600 border border-yellow-300",
  resolved: "bg-green-100 text-green-600 border border-green-300",
};
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/report`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
             setData(data.data);
        };
       
        fetchData();
    }, []);

    return(
        <Layout>
        <div>All Reports</div>
        <div className='mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
           
            {data.map((item) => (
               <Link to={`/app/allreports/${item._id}`} key={item._id} className='h-full'>
                <div  className='border p-3 rounded-lg shadow-md border-gray-200'>
                    <img src={item.imageUrl} alt="Report" className='mb-3 rounded-md' style={{ aspectRatio: '16 / 9', objectfit: 'cover',  width: '100%'}}/>
                 <div
          
          className={`px-3 py-[2px] rounded-lg w-fit text-[11px] font-medium ${
            statusColors[item.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          Status : {item.status}
        </div>
                    <p className='mt-2 line-clamp-2 text-[13px]'><strong className='font-medium text-[13.5px] text-gray-800'>Location : </strong>{item.location?.coordinates[0]}, {item.location?.coordinates[1]}</p>
                    <p className='line-clamp-2 text-[13px]'><strong className='font-medium text-[13.5px] text-gray-800'>Description :</strong> {item.description}</p>
                </div>
                </Link>
            ))}
        </div>
        </Layout>
    )
}


export default mymarks;