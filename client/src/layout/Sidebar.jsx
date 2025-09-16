import { NavLink } from "react-router-dom"
import {MentoringIcon, CheckmarkSquare04Icon, CancelSquareIcon, InboxDownloadIcon} from 'hugeicons-react'




const sidebar = () => {
console.log(MentoringIcon)
    const sidebar = [
        {
            icon: CheckmarkSquare04Icon,
            text: "My Marks",
            url: "/app/mymarks"
        },
        {
            icon: MentoringIcon,
            text: "Leaderboard",
            url: "/app/leaderboard"
        },
      
        {
            icon: InboxDownloadIcon,
            text: "Inbox",
            url: "/app/inbox"
        },
       
        
    ]
    return (
        <div className=' h-screen relative w-[225px]'>
            <div className="absolute top-0 left-0 bg-gray-100 w-full h-screen flex flex-col justify-between border-r border-r-gray-300">
                <div className=' gap-2 border-b border-b-gray-300 bg-[#3446c1] min-h-[40px] flex items-center '>
                    {/* <img className='w-[45px]'  alt="logo" /> */}
                    <p className="font-semibold text-[17px] pl-5 text-white">PlastTrack </p>

                </div>
                <div className="px-2 py-5 h-full flex flex-col justify-between gap-1">
                    <div className="flex flex-col gap-[12px]">
                        {sidebar.map((itm, idx) => {
                            const Icon = itm.icon
                        return (
                            <NavLink
                                key={idx}
                                to={itm.url}
                                className={({ isActive }) =>
                                    `flex items-center rounded-[7px] py-[5px] px-2 font-medium text-[13px] gap-[8px] ${isActive ? 'bg-bg-gray-200' : 'hover:bg-gray-200'
                                    }`
                                }
                            >
                              <Icon size={19}/>
                                {itm.text}
                            </NavLink>
                        )
                    })}
                    </div>
                    <button  className="flex rounded-[7px] py-[5px] px-2 font-medium text-[13px] gap-[8px] hover:bg-gray-200 cursor-pointer"><CancelSquareIcon size={19}/>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default sidebar