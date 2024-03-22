"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useCurrentUser } from "../../hooks/user";
import { MdDriveFolderUpload } from "react-icons/md";
import { TiUpload } from "react-icons/ti";
import { LuImageMinus } from "react-icons/lu";

export default function Card() {
  const [written, setWritten] = useState(false);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const { user } = useCurrentUser();
  return (
    <div className="grid-cols-12 grid border border-x-0 border-b-0 border-gray-900 p-4 hover:border-gray-800 hover:bg-[#080808] transition-all duration-300">
      <div className="col-span-1 ">
        {user && user.profileImageURL && (
          <Image
            src={user?.profileImageURL}
            width={40}
            height={40}
            alt="profile picture"
            className="rounded-full "
          />
        )}
      </div>
      <div className="col-span-11 ">
        <textarea
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setWritten(true);
            } else {
              setWritten(false);
            }
          }}
          name=""
          id=""
          rows={3}
          className="w-full bg-transparent outline-none px-4 border-b-gray-900 border-b"
          placeholder="What's happening?"
        ></textarea>
        <div className="font-xl mt-2 flex  justify-between">
          <LuImageMinus onClick={handleSelectImage} className="size-5" />
          <button
            disabled={!written}
            className={`${
              written ? "bg-orange-600" : "bg-orange-800"
            } font-bold tracking-normal text-lg p-1 text-[#0C0C0C] rounded-3xl w-1/4`}
          >
            post
          </button>
        </div>
      </div>
    </div>
  );
}
