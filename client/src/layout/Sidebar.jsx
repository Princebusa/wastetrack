import { NavLink } from "react-router-dom"
import {UserSquareIcon, MentoringIcon, CheckmarkSquare04Icon, CancelSquareIcon, InboxDownloadIcon, MapsIcon, DiscoverSquareIcon} from 'hugeicons-react'




const sidebar = () => {

    const sidebar = [
        {
            icon: MapsIcon,
            text: "Map",
            url: "/app/Map"
        },
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

    const social = [
        {
            icon: DiscoverSquareIcon,
            text: "Explore",
            url: "app/explore"
        },
        {
            icon: UserSquareIcon,
            text: "Profile",
            url: "app/profile"
        }
    ]
    return (
        <div className=' h-screen relative w-[205px]'>
            <div className="fixed w-[205px] top-0 left-0 bg-gray-100  h-screen flex flex-col justify-between border-r border-r-gray-300">
                <div className=' gap-2 border-b border-b-gray-300  min-h-[40px] flex items-center '>
                    {/* <img className='w-[45px]'  alt="logo" /> */}
                    <div className="font-semibold text-[17px] pl-5 flex "><p className="bg-green-800 text-white flex justify-center block w-[25px] h-[25px] rounded-[4px] mr-2">P</p><p>PlastTrack</p> </div>

                </div>
                <div className="px-2 py-5 h-full flex flex-col justify-between gap-1">
                    <div>
                        <div className="flex flex-col gap-[5px]">
                        <p className="font-medium text-gray-700 text-[11px] px-2 mb-1">Platform</p>
                        {sidebar.map((itm, idx) => {
                            const Icon = itm.icon
                        return (
                            <NavLink
                                key={idx}
                                to={itm.url}
                                className={({ isActive }) =>
                                    `flex items-center rounded-[7px] py-[5px] px-2 font-medium text-[13px] gap-[8px] ${isActive ? 'bg-gray-200' : 'hover:bg-gray-200'
                                    }`
                                }
                            >
                              <Icon size={19}/>
                                {itm.text}
                            </NavLink>
                        )
                    })}
                    </div>


                     <div className="mt-10 flex flex-col gap-[5px]">
                        <p className="font-medium text-gray-700 text-[11px] px-2 mb-1">Social</p>
                        {social.map((itm, idx) => {
                            const Icon = itm.icon
                        return (
                            <NavLink
                                key={idx}
                                to={itm.url}
                                className={({ isActive }) =>
                                    `flex items-center rounded-[7px] py-[5px] px-2 font-medium text-[13px] gap-[8px] ${isActive ? 'bg-gray-200' : 'hover:bg-gray-200'
                                    }`
                                }
                            >
                              <Icon size={19}/>
                                {itm.text}
                            </NavLink>
                        )
                    })}
                    </div>
                    </div>
                    <button  className="flex rounded-[7px] py-[5px] px-2 mt-full font-medium text-[13px] gap-[8px] hover:bg-gray-200 cursor-pointer"><CancelSquareIcon size={19}/>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default sidebar