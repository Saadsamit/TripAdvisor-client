"use client";
import banner from "@/src/assets/banner-2.jpg";
import { CSSProperties } from "react";
import Container from "./Container";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CommonBanner = () => {
  const pathname = usePathname();
  const style: CSSProperties = {
    background: `url(${banner.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div style={style} className="h-[400px] my-4 rounded-xl relative">
      <div className="absolute rounded-xl inset-0 opacity-65 bg-black"></div>
      <div className="relative z-10 text-white space-y-4 h-full">
        <Container className="h-full">
          <div className="flex justify-center items-center h-full">
            <div className="text-center flex">
              <Link href={"/"} className="hover:underline mr-2">
                Home
              </Link>
              <p className="capitalize cursor-pointer">
                {">"} {pathname.replace("/", "")}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CommonBanner;
