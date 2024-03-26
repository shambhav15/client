"use client";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import Card from "@/components/Card";
import { Tweet } from "../../../gql/graphql";
import { useCurrentUser, useGetUserById } from "../../../hooks/user";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { graphqlClient } from "../../../clients/api";
import {
  followUserMutation,
  unfollowUserMutation,
} from "../../../graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useCurrentUser();
  const userInfo = useGetUserById(params?.id as string);
  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    if (!userInfo?.user || !user) return false;
    return (
      (user?.following?.findIndex((el) => el?.id === userInfo?.user?.id) ??
        -1) >= 0
    );
  }, [userInfo?.user, user]);

  const handleFollowUser = useCallback(async () => {
    if (!userInfo?.user?.id) return;
    await graphqlClient.request(followUserMutation, { to: userInfo?.user?.id });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [queryClient, userInfo?.user?.id]);

  const handleUnfollowUser = useCallback(async () => {
    if (!userInfo?.user?.id) return;

    await graphqlClient.request(unfollowUserMutation, {
      to: userInfo?.user?.id,
    });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [userInfo?.user?.id, queryClient]);

  return (
    <div className="sm:col-span-5 col-span-9 overflow-scroll h-screen scroll-smooth scrollbar-hide">
      <nav className="p-2 items-center flex">
        <BsArrowLeftShort
          className="cursor-pointer"
          size={30}
          onClick={() => router.replace("/")}
        />
        <div>
          <h1 className="text-xl font-bold ml-4">
            {userInfo?.user?.firstName}
          </h1>
          <p className="text-sm ml-4">
            {userInfo?.user?.tweets?.length} Tweets
          </p>
        </div>
      </nav>
      <div className="p-4 border-b border-b-gray-900">
        {userInfo?.user?.profileImageURL && (
          <Image
            className="rounded-full"
            src={userInfo?.user?.profileImageURL}
            alt="profile-image"
            height={100}
            width={100}
          />
        )}
        <h1 className="text-xl mt-5 font-bold ">
          {userInfo?.user?.firstName} {userInfo?.user?.lastName}
        </h1>
        <div className="flex justify-between gap-2 text-gray-500 text-sm">
          <div>
            <span>{userInfo?.user?.follower?.length} Followers </span>
            <span>{userInfo?.user?.following?.length} Following </span>
          </div>
          {user?.id != userInfo?.user?.id && (
            <>
              {amIFollowing ? (
                <button
                  onClick={handleUnfollowUser}
                  className="rounded-2xl bg-white text-black py-2 px-4 font-semibold"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollowUser}
                  className="rounded-2xl bg-white text-black py-2 px-4 font-semibold"
                >
                  Follow
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        {userInfo?.user?.tweets?.slice().reverse().map((tweet) => {
          return tweet ? <Card key={tweet?.id} data={tweet as Tweet} /> : null;
        })}
      </div>
    </div>
  );
}
