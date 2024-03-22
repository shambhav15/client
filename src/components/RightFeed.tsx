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

export default function RightFeed() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  console.log(user);

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
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__Twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["current-user"]);
    },

    [queryClient]
  );

  return (
    <div className="col-span-3 border-l border-l-gray-900 ml-4 p-1 ">
      {!user && (
        <div className="p-5 flex flex-col items-center border-gray-900 border hover:border-gray-800 hover:bg-[#080808] transition-all duration-300 h-fit">
          <div className="flex items-center justify-center gap-2 text-lg mb-5">
            <PiGoogleChromeLogo />
            <div className="font-bold">Login with google</div>
          </div>
          <GoogleLogin onSuccess={handleGoogleLogin} />
        </div>
      )}
    </div>
  );
}
