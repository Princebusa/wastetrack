import Layout from '../layout/Layout'
import base from '../assets/base.jpg'
import rank2 from '../assets/rank-2.png'
import rank3 from '../assets/rank-3.png'
import rank1 from '../assets/rank-1.png'
import { use, useEffect, useState } from 'react'
import axios from 'axios'

const Leaderboard = () => {
const [data, setData] = useState([])
const [top3user, setTop3User] = useState([])


 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get/allusers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // res.data = { success: true, data: [...] }
   const users = res.data.data;

// Sort descending (highest → lowest points)
const sortedData = [...users].sort((a, b) => b.points - a.points);

setData(sortedData);

      // For top 3 (highest points)
      const top3 = [...users]
        .sort((a, b) => b.points - a.points)
        .slice(0, 3);

      setTop3User(top3);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchData();
}, []);

  const leaderboardData = [
    {
      id: 1,
      name: "Alex Rodriguez",
      area: "Sales",
      points: 2850,
      badge: "Champion",
    },
    {
      id: 2,
      name: "Sarah Chen",
      area: "Marketing",
      points: 2720,
      badge: "Expert",
    },
    {
      id: 3,
      name: "Michael Johnson",
      area: "Development",
      points: 2650,
      badge: "Master",
    },
    {
      id: 4,
      name: "Emily Davis",
      area: "Design",
      points: 2480,
      badge: "Pro",
    },
    {
      id: 5,
      name: "David Wilson",
      area: "Operations",
      points: 2350,
      badge: "Advanced",
    },
    {
      id: 6,
      name: "Lisa Thompson",
      area: "HR",
      points: 2200,
      badge: "Skilled",
    },
    {
      id: 7,
      name: "James Brown",
      area: "Finance",
      points: 2100,
      badge: "Rising Star",
    },
    {
      id: 8,
      name: "Maria Garcia",
      area: "Customer Success",
      points: 1950,
      badge: "Achiever",
    },
  ]
  return (
    <Layout>
      <div className='mt-3 flex gap-5  flex justify-center'>

        <div className='w-[50%]'>
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Rank</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">User</th>
               
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Points</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Badge</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index} className="bg-gray-50 shadow-sm rounded-lg">
                  {/* Rank Number */}
                  <td className="px-4 py-2 font-semibold text-gray-700">{index + 1}</td>

                  {/* Avatar + Name */}
                  <td className="px-4 py-2 flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-800 text-white font-semibold">
                      <img src={user.avatarUrl}/>
                      
                     
                    </div>
                    <span className="text-gray-800">{user.username}</span>
                  </td>

                 
                  {/* Points */}
                  <td className="px-4 py-2 text-gray-600">{user.points}</td>

                  {/* Badge */}
                  <td className="px-4 py-2">
                    {/* <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {user.badge}
                    </span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>



        </div>
        <div className='w-[50%] flex flex-col justify-end items-center'>
          <div className=" font-semibold text-[20px]">Rankings At Country Level</div>
          <div className="h-20">Top 3 Citizen</div>
          
          <div className='flex mt-10 relative w-[600px] justify-center items-end gap-5'>
            <img className='absolute bottom-0 left-0' src={base} alt="" />
            <div className='shadow-lg flex  flex-col items-center w-[100px] rounded-t-lg border-b-0 h-[300px] border border-[#b0a207] bg-gradient-to-b from-[hsla(55,100%,55%,1)] to-[hsla(0,0%,100%,1)]'>
              <img className='mt-[-80px] ' src={rank3} alt="" />
              <img className='w-[45px] h-[45px] mt-[-60px]' src={data[2]?.avatarUrl}/>
              <p className='mt-5'>pts {data[2]?.points}</p>
              <p>{data[2]?.username}</p>
            </div>
            <div className='flex  flex-col items-center w-[100px] rounded-t-lg border-b-0 border border-[#5b7e01] bg-gradient-to-b from-[hsla(77,98%,25%,1)] to-[hsla(0,0%,100%,1)] h-[400px]'>
             <img className='mt-[-80px]' src={rank1} alt="" />
              <img className='w-[45px] h-[45px] mt-[-60px]' src={data[0]?.avatarUrl}/>
              <p className='mt-5'>pts {data[0]?.points}</p>
              <p>{data[0]?.username}</p>
            </div>
            <div className='flex  flex-col items-center w-[100px]   rounded-t-lg border-b-0 border border-[#565656] bg-gradient-to-b from-[hsla(0,0%,59%,1)] to-[hsla(0,0%,100%,1)] h-[350px]'>
             <img className='mt-[-80px] ' src={rank2} alt="" />
              <img className='w-[45px] mt-[-60px] h-[45px]' src={data[1]?.avatarUrl}/>
              <p className='mt-5'>pts {data[1]?.points}</p>
              <p>{data[1]?.username}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Leaderboard