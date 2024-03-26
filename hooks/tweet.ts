"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllTweetsQuery } from "../graphql/query/tweet";
import { graphqlClient } from "../clients/api";
import { createTweetMutation } from "../graphql/mutation/tweet";
import { CreateTweetData } from "../gql/graphql";
import toast from "react-hot-toast";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphqlClient.request(createTweetMutation, { payload }),
    onMutate: (payload) => toast.loading("Creating Tweet", { id: "1" }),
    onSuccess: async (payload) => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      toast.success("Created Success", { id: "1" });
    },
  });

  return mutation;
};

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(GetAllTweetsQuery),
  });

  return { ...query, tweet: query.data?.getAllTweets };
};
