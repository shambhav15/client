"use client";
import Image from "next/image";
import React from "react";
import { TbMessageCircle } from "react-icons/tb";
import { BiRepost } from "react-icons/bi";
import { HiOutlineHeart } from "react-icons/hi2";
import { IoIosStats } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { RiShareForward2Line } from "react-icons/ri";
import { Tweet } from "../../gql/graphql";
import Link from "next/link";
interface CardProps {
  data: Tweet;
}

const Card: React.FC<CardProps> = (props) => {
  const { data } = props;

  // console.log(data.author?.lastName);

  return (
    <div className="grid-cols-12 grid border border-x-0 border-b-0 border-gray-900 p-4 hover:border-gray-800 hover:bg-[#080808] transition-all duration-300">
      <div className="col-span-1 ">
        {data.author?.profileImageURL && (
          <Image
            src={data.author?.profileImageURL}
            width={35}
            height={35}
            alt="profile picture"
            className="rounded-full "
          />
        )}
      </div>
      <div className="col-span-11 px-2">
        <h1>
          <Link href={`/${data?.author?.id}`}>{data.author?.firstName}</Link>
        </h1>
        <p>{data.content}</p>
        {data?.imageURL && (
          <Image
            src={data?.imageURL}
            width={400}
            height={400}
            alt="tweet image"
          />
        )}
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
};

export default Card;
