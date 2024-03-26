"use client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQuery, getUserByIdQuery } from "../graphql/query/user";
import { graphqlClient } from "../clients/api";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphqlClient.request(getCurrentUserQuery),
  });

  return { ...query, user: query.data?.getCurrentUser };
};

export const useGetUserById = (id: string) => {
  const query = useQuery({
    queryKey: ["user-byId", id],
    queryFn: () => graphqlClient.request(getUserByIdQuery, { id }),
  });

  return { ...query, user: query.data?.getUserById };
};
