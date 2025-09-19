
import { useEffect } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';
const inbox = () => {

  useEffect(() => {
   const usefetch = async()=>{
    const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/inbox`);
  console.log(data);
   }
   usefetch();
  }, [])
  return (
    <Layout>
    <div className="p-5">inbox</div>
    </Layout>
  )
}

export default inbox;
