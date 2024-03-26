"use client";
import React, { useCallback, useMemo } from "react";
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
import { useCurrentUser } from "../../hooks/user";
import Image from "next/image";
import Link from "next/link";

interface TwitterSideBarMenu {
  title: string;
  icon: ReactNode;
  link?: string;
}

export default function SideBar() {
  const { user } = useCurrentUser();

  const handleCheckLogin = () => {
    if (!user) {
      return alert("Login to tweet");
    }
  };

  const sideBarItems: TwitterSideBarMenu[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiSolidHomeCircle />,
        link: "/",
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
        link: `/${user?.id ? user?.id : ""} `,
      },
    ],
    [user?.id]
  );

  return (
    <div className="sm:col-span-3 col-span-1 flex pt-2 pr-4 border-r sm:justify-center relative border-r-gray-900">
      <div>
        <div className="text-3xl hover:bg-gray-900 h-fit w-fit rounded-full p-2 cursor-pointer transition-all duration-100 ">
          <Link href="/">
            <BsTwitter />
          </Link>
        </div>

        <div>
          <ul className="">
            {sideBarItems.map((item, index) => (
              <li key={index} className="">
                <Link
                  href={item.link || "/"}
                  className=" flex items-center  text-2xl text-gray-400 hover:text-white w-fit h-fit rounded-3xl px-2 py-2 hover:bg-gray-950 cursor-pointer transition-all duration-300"
                >
                  <span> {item.icon}</span>

                  <span className="hidden sm:inline text-gray-400 hover:text-white transition duration-300">
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleCheckLogin}
            className="hidden sm:inline p-2 bg-orange-600 font-bold tracking-normal text-lg text-[#0C0C0C] rounded-3xl w-3/4 mt-6 "
          >
            Tweet
          </button>
          <div className="absolute bottom-10 rounded-xl p-2 bg-gray-950 flex gap-3">
            {user && user.profileImageURL && (
              <Image
                src={user?.profileImageURL}
                alt="user profile"
                className="border rounded-full "
                width={50}
                height={50}
              />
            )}
            <div className="text-xs hidden lg:block">
              <h1>{user?.firstName}</h1>
              <h2>{user?.email}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
