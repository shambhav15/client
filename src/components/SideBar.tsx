import React from "react";
import { BsTwitter } from "react-icons/bs";
import { ReactNode } from "react";
import { BiSolidHomeCircle } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMessageRoundedDots } from "react-icons/bi";
import { RiFileList2Line } from "react-icons/ri";
import { FcBookmark } from "react-icons/fc";
import { BsPeople } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { CgMenuRound } from "react-icons/cg";

interface TwitterSideBarMenu {
  title: string;
  icon: ReactNode;
}

export const sideBarItems: TwitterSideBarMenu[] = [
  {
    title: "Home",
    icon: <BiSolidHomeCircle />,
  },
  {
    title: "Explore",
    icon: <CiSearch />,
  },
  {
    title: "Notifications",
    icon: <IoMdNotificationsOutline />,
  },
  {
    title: "Messages",
    icon: <BiMessageRoundedDots />,
  },
  {
    title: "Lists",
    icon: <RiFileList2Line />,
  },
  {
    title: "Bookmarks",
    icon: <FcBookmark />,
  },
  {
    title: "communities",
    icon: <BsPeople />,
  },
  {
    title: "More",
    icon: <IoPersonOutline />,
  },
  {
    title: "Profile",
    icon: <CgMenuRound />,
  },
];

export default function SideBar() {
  return (
    <div className="col-span-3 flex flex-col pt-8 border-r w-full border-r-gray-900">
      <div className="text-3xl hover:bg-gray-900 h-fit w-fit rounded-full p-2 cursor-pointer transition-all duration-100 ">
        <BsTwitter />
      </div>

      <div>
        <ul className="">
          {sideBarItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center  text-2xl text-gray-400 hover:text-white w-fit h-fit rounded-3xl px-2 py-2 hover:bg-gray-950 cursor-pointer transition-all duration-300"
            >
              {item.icon}
              <span className="ml-4 font-sans text-gray-400 hover:text-white transition duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        <button className="p-2 bg-orange-600 font-bold tracking-normal text-lg text-[#0C0C0C] rounded-3xl w-3/4 mt-6 ">
          Tweet
        </button>
      </div>
    </div>
  );
}
