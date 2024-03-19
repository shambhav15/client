import Hero from "@/components/Hero";
import RightFeed from "@/components/RightFeed";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 h-screen w-screen px-72">
        <SideBar />
        <Hero />
        <RightFeed />
      </div>
    </>
  );
}
