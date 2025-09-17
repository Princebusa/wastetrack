import { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import  axios from 'axios';
import {AddCircleHalfDotIcon} from 'hugeicons-react'
import { Link } from 'react-router-dom';
const mymarks = ()=>{
const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get/report`, {
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
        <div>My Marks</div>
        <div className='mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
           <Link to="/app/map" className='h-full'>
            <div className='h-full border p-5 bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg shadow-md border-gray-200 flex flex-col justify-center items-center '>
               <div className='bg-white h-full w-full rounded-lg flex flex-col justify-center items-center p-5 border-2 border-dashed border-gray-300 '>
                 <AddCircleHalfDotIcon size={60} color='#5c5c5cff'/>
                <p className='bg-gray-100 border border-gray-200 rounded-xl px-5 py-2 mt-5 text-[13px] font-semibold'>Create a New Report</p>
               </div>
            </div>
            </Link>
            {data.map((item) => (
                <div key={item._id} className='border p-3 rounded-lg shadow-md border-gray-200'>
                    <img src={item.imageUrl} alt="Report" className='mb-3 rounded-md' style={{ aspectRatio: '16 / 9', objectfit: 'cover',  width: '100%'}}/>
                 
                    <p><strong className='font-medium text-[13px] text-gray-800'>Location :</strong>{item.latitude}, {item.longitude}</p>
                    <p className='text-[12px]'><strong className='font-medium text-[13px] text-gray-800'>Description :</strong> {item.description}</p>
                </div>
            ))}
        </div>
        </Layout>
    )
}


export default mymarks;