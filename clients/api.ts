"use client";
import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

export const graphqlClient = new GraphQLClient(
  "https://dr7p2sdn1frm1.cloudfront.net/graphql",
  {
    headers: () => ({
      Authorization: isClient
        ? `Bearer ${window.localStorage.getItem("__Twitter_token")}`
        : "",
    }),
  }
);
