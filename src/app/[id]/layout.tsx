import RightFeed from "@/components/RightFeed";
import SideBar from "@/components/SideBar";
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
