"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useCurrentUser } from "../../hooks/user";
import { LuImageMinus } from "react-icons/lu";
import { useCreateTweet } from "../../hooks/tweet";
import { graphqlClient } from "../../clients/api";
import { getSignedURLTweetQuery } from "../../graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

export default function PostCard() {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const { mutate } = useCreateTweet();
  const { user } = useCurrentUser();

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const { getSignedURLForTweet } = await graphqlClient.request(
        getSignedURLTweetQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );

      if (getSignedURLForTweet) {
        toast.loading("Uploading image...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Image uploaded", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const filePath = url.origin + url.pathname;
        setImageUrl(filePath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);
    input.click();
  }, [handleInputChangeFile]);

  const handleCreateTweet = useCallback(() => {
    if (!user || !user.id) return toast.error("login to post tweet");
    mutate({ content, imageURL: imageUrl });
    setContent("");
    setImageUrl(null);
  }, [content, imageUrl, mutate, user]);

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
            setContent(e.target.value);
          }}
          name=""
          id=""
          rows={3}
          className="w-full bg-transparent outline-none px-4 border-b-gray-900 border-b"
          placeholder="What's happening?"
        ></textarea>
        {imageUrl && (
          <div className="flex justify-center">
            <Image src={imageUrl} width={200} height={200} alt="image" />
          </div>
        )}
        <div className="font-xl mt-2 flex  justify-between">
          <LuImageMinus onClick={handleSelectImage} className="size-5" />
          <button
            onClick={handleCreateTweet}
            className="bg-orange-600 font-bold tracking-normal text-lg p-1 text-[#0C0C0C] rounded-3xl w-1/4"
          >
            post
          </button>
        </div>
      </div>
    </div>
  );
}
