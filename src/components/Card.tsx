"use client";
import Image from "next/image";
import React from "react";
import { TbMessageCircle } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { HiOutlineHeart } from "react-icons/hi2";
import { IoIosStats } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { RiShareForward2Line } from "react-icons/ri";

export default function Card() {
  return (
    <div className="grid-cols-12 grid border border-x-0 border-b-0 border-gray-900 p-4 hover:border-gray-800 hover:bg-[#080808] transition-all duration-300">
      <div className="col-span-1 ">
        <Image
          src="https://avatars.githubusercontent.com/u/89960115?v=4"
          width={40}
          height={40}
          alt="profile picture"
          className="rounded-full "
        />
      </div>
      <div className="col-span-11 px-2">
        <h1>shambhav</h1>
        <p>
          #Binance gave me the challenge of taking on @anamxrkovic7 in a game of
          foosball, with a twist! Coming soon 🤝
        </p>
        <ul className="flex w-full justify-between text-xl mt-3">
          <li>
            <TbMessageCircle />
          </li>
          <li>
            <BiRepost />
          </li>
          <li>
            <HiOutlineHeart />
          </li>
          <li>
            <IoIosStats />
          </li>
          <li>
            <CiBookmark />
          </li>
          <li>
            <RiShareForward2Line />
          </li>
        </ul>
      </div>
    </div>
  );
}
