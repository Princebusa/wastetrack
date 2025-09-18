import { Routes, Route, Navigate  } from 'react-router-dom';


import MyMark from './dashboard/MyMarks';
import Leaderboard from './dashboard/Leaderboard';
import Inbox from './dashboard/Inbox';
import SingleReport from './dashboard/singleReport';
import Social from './dashboard/social';

function dashboard() {


  return (
    
   <Routes>
     <Route index element={<Navigate to="allreports" replace />} />
    <Route path='/allreports/:reportid' element={<SingleReport/>} />
    <Route path="/allreports" element={<MyMark/>} />
    <Route path="/leaderboard" element={<Leaderboard/>} />
    <Route path="/inbox" element={<Inbox/>} />
   
    <Route path="/social" element={<Social/>} />
    </Routes>

      
  )
}

export default dashboard
