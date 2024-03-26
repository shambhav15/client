import RightFeed from "@/components/RightFeed";
import SideBar from "@/components/SideBar";
import React from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <>{children}</>;
}
