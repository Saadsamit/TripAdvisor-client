import banner from "@/src/assets/banner.jpg";
import { CSSProperties } from "react";
import Container from "../../UI/Container";
import Button from "../../UI/Button";

const Banner = () => {
  const style: CSSProperties = {
    background: `url(${banner.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div
      style={style}
      className="h-[calc(100vh-100px)] my-4 rounded-xl relative"
    >
      <div className="absolute rounded-xl inset-0 opacity-65 bg-black"></div>
      <div className="relative z-10 text-white space-y-4 h-full">
        <Container className="h-full">
          <div className="flex justify-center items-center h-full">
            <div className="space-y-4 text-center">
              <h1 className="sm:text-5xl text-4xl font-bold">
                Discover Travel Tips & <br /> Top Destinations
              </h1>
              <h3 className="text-base font-light">
                Unlock the Secrets to Stress-Free Travel and Hidden Gems
              </h3>
              <Button link="/news-feed" className="mt-3">
                Discover
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
