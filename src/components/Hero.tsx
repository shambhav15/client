"use client";
import React, { useEffect } from "react";
import Card from "./Card";
import PostCard from "./PostCard";
import { useGetAllTweets } from "../../hooks/tweet";
import { Tweet } from "../../gql/graphql";

export default function Hero() {
  const { tweet = [] } = useGetAllTweets();

  return (
    <div className="sm:col-span-5  col-span-9 overflow-scroll h-screen scroll-smooth scrollbar-hide">
      <PostCard />
      {tweet?.map((tweet) =>
        tweet ? <Card key={tweet?.id} data={tweet as Tweet} /> : null
      )}
    </div>
  );
}
