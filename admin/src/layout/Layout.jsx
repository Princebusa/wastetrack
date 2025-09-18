import Sidebar from './Sidebar'
import { useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import icon from '../assets/coin.png'
const layout = ({ children }) => {
     const location = useLocation();
  const pathParts = location.pathname.split("/"); 
  const lastPart = pathParts[pathParts.length - 1];
const{logout} = useAuth()
    return (
        <div className="flex w-full bg-cover bg-no-repeat bg-center" >
            <Sidebar />
            <div className='w-full'>
                <div className='border-b border-b-gray-300 min-h-[40px] flex justify-between items-center '>
                    <div className='max-w-[1300px] mx-auto px-[20px] flex justify-between items-center w-full'>
                        <p className='font-medium text-[15px]'>{lastPart}</p>

                       <div className='flex gap-5 flex items-center'>
                         
                           <div onClick={logout} >
                             <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    className='cursor-pointer'
    viewBox="0 0 24 24"
    fill="none"
   
  >
    <g id="Iconly/Curved/Logout">
      <g id="Logout">
        <path
          d="M21.791 12.1208H9.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.8643 9.20483L21.7923 12.1208L18.8643 15.0368"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.3597 7.63C16.0297 4.05 14.6897 2.75 9.35974 2.75C2.25874 2.75 2.25874 5.06 2.25874 12C2.25874 18.94 2.25874 21.25 9.35974 21.25C14.6897 21.25 16.0297 19.95 16.3597 16.37"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
                           </div>
                       </div>
                        {/* <div className='flex items-center justify-center gap-2 cursor-pointer bg-white   rounded-[10px] '>
                            <div className='rounded-full border border-[1px] border-[rgba(63,20,116,1)]'>
                                <img  alt="user avatar" className='w-7 h-7 block rounded-full border border-[1px] border-[#fff]' />
                            </div>
                            <p className='text-sm leading-1 font-semibold tracking-[0.2px]' >Prince</p>
                        </div> */}
                    </div>
                </div>
                  <div className='max-w-[1300px] mx-auto px-[20px] mt-3'>
                {children}
                </div>
            </div>
        </div>


    )
}

export default layout