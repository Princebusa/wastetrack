import { Routes, Route, Navigate  } from 'react-router-dom';


import MyMark from './dashboard/MyMarks';
import Leaderboard from './dashboard/Leaderboard';
import Inbox from './dashboard/Inbox';
import Map from './dashboard/map';
import Social from './dashboard/social';

function dashboard() {


  return (
    
   <Routes>
     <Route index element={<Navigate to="mymarks" replace />} />
    
    <Route path="/mymarks" element={<MyMark/>} />
    <Route path="/leaderboard" element={<Leaderboard/>} />
    <Route path="/inbox" element={<Inbox/>} />
    <Route path="/map" element={<Map/>} />
    <Route path="/social" element={<Social/>} />
    </Routes>

      
  )
}

export default dashboard
