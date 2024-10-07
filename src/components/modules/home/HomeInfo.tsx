import myImage from "@/src/assets/homeImg.jpg";
import Image from "next/image";

const HomeInfo = () => {
  return (
    <div className="mb-20">
        <h3 className="text-4xl font-bold capitalize text-sky-400 mb-10 text-center">
        Tips Info
      </h3>
    <div className=" grid md:grid-cols-2 items-center gap-8">
      <div>
        <Image
          src={myImage.src}
          alt=""
          width={500}
          height={500}
          className="rounded-xl w-full"
        />
      </div>
      <div>
        <p>
          Travel Tips & Destination Guides is a platform created for explorers,
          wanderers, and travel enthusiasts who are looking to enhance their
          travel experiences. Whether you’re a seasoned traveler or embarking on
          your first trip, our goal is to provide you with reliable, up-to-date
          tips, and comprehensive destination guides that cater to every type of
          traveler.
        </p>
      </div>
    </div>
    </div>
  );
};

export default HomeInfo;
