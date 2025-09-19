
import { useEffect } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';
import { useState } from 'react';

const inbox = () => {
  const [data, setData] = useState([]);
console.log(data)
  useEffect(() => {
   const usefetch = async()=>{
    const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/inboxs`);
  setData(data.data);
   }
   usefetch();

  }, [])

  const handelAccept = async(id)=>{
   
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/inboxs/${id}`,{
        body:{"type":"accepted"}
      })
    }
      const handelReject = async(id)=>{
   
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/inboxs/${id}`,{
        body:{"type":"reject"}
      })
    }
  return (
    <Layout>
    <div className="p-5">inbox</div>
    <div>
      {data.map((item)=>(
        <div key={item._id} className="border flex justify-between p-3 m-3 rounded-lg shadow-md border-gray-200">
          <p className="text-[14px]"><strong className="font-medium text-[14.5px] text-gray-800">Name :</strong> {item.reportId?.description}</p>
         <div className='flex gap-3'>
           <button className='bg-green-100 border border-green-700 rounded-sm px-3 text-[13px]' onClick={()=> handelAccept(item._id)}>Accept</button>
           <button className='bg-red-100 border border-red-700 rounded-sm px-3 text-[13px]' onClick={()=> handelReject(item._id)}>Reject</button>

         </div>
        </div>
      ))} 
    </div>
    </Layout>
  )
}

export default inbox;
