"use client";
import React, { useCallback } from "react";

import {
  CredentialResponse,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import { PiGoogleChromeLogo } from "react-icons/pi";
import toast from "react-hot-toast";
import { graphqlClient } from "../../clients/api";
import { verifyUserGoogleQuery } from "../../graphql/query/user";
import { useCurrentUser } from "../../hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function RightFeed() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleGoogleLogin = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error("Failed to login with google");
      }
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleQuery,
        {
          token: googleToken,
        }
      );
      toast.success("verified success");

      if (verifyGoogleToken)
        window.localStorage.setItem("__Twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },

    [queryClient]
  );

  return (
    <div className="hidden sm:col-span-4 lg:block border-l border-l-gray-900 ml-4 p-1 ">
      {!user ? (
        <div className="p-5 hidden sm:block border-gray-900 border hover:border-gray-800 hover:bg-[#080808] transition-all duration-300 h-fit">
          <div className="flex items-center justify-center gap-2 text-lg mb-5">
            <PiGoogleChromeLogo />
            <div className="font-bold">Login with google</div>
          </div>
          <GoogleLogin onSuccess={handleGoogleLogin} />
        </div>
      ) : (
        <div className="p-5 border  border-gray-900 hover:border-gray-800 hover:bg-[#080808] transition-all duration-300 max-w-xs mx-auto rounded-lg shadow-lg">
          <h1 className="mb-4 font-sans text-xl text-center">
            People you may know
          </h1>
          <div className="space-y-4">
            {user?.recommendedUsers?.map((el) => (
              <div
                className="flex items-center p-3 border-b border-gray-400 last:border-0"
                key={el?.id}
              >
                {el?.profileImageURL && (
                  <Image
                    src={el?.profileImageURL}
                    alt="profileImage"
                    width={30}
                    height={30}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                )}
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {el?.firstName} {el?.lastName}
                  </span>
                  <Link
                    href={`/${el?.id}`}
                    className="bg-white text-black rounded-lg py-1 px-3 mt-1 text-center font-semibold inline-block"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
