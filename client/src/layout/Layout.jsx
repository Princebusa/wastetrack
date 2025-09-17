import Sidebar from './Sidebar'
import { useLocation } from 'react-router-dom';

const layout = ({ children }) => {
     const location = useLocation();
  const pathParts = location.pathname.split("/"); 
  const lastPart = pathParts[pathParts.length - 1];

    return (
        <div className="flex w-full bg-cover bg-no-repeat bg-center" >
            <Sidebar />
            <div className='w-full'>
                <div className='min-h-[40px] border-b border-b-gray-300 flex justify-between items-center '>
                    <div className='max-w-[1300px] mx-auto px-[20px] flex justify-between items-center w-full'>
                        <p className='font-medium text-[15px]'>{lastPart}</p>
                        <div className='flex items-center justify-center gap-2 cursor-pointer bg-white   rounded-[10px] '>
                            <div className='rounded-full border border-[1px] border-[rgba(63,20,116,1)]'>
                                <img  alt="user avatar" className='w-7 h-7 block rounded-full border border-[1px] border-[#fff]' />
                            </div>
                            <p className='text-sm leading-1 font-semibold tracking-[0.2px]' >Prince</p>
                        </div>
                    </div>
                </div>
                  <div className='max-w-[1300px] mx-auto px-[20px]'>
                {children}
                </div>
            </div>
        </div>


    )
}

export default layout