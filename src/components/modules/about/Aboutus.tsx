import Image from "next/image";
import aboutImage from "@/src/assets/banner-2.jpg";

// Expert Travel Tips
// Comprehensive Destination Guides
// Personalized Recommendations
// Sustainability Focus

const Aboutus = () => {
  return (
    <div>
      <h3 className="capitalize font-bold text-3xl py-5 text-center text-sky-400">
        about us
      </h3>
      <p className="text-center">
        Travel Tips & Destination Guides is a platform created for explorers,
        wanderers, and travel enthusiasts who are looking to enhance their
        travel experiences. Whether you’re a seasoned traveler or embarking on
        your first trip, our goal is to provide you with reliable, up-to-date
        tips, and comprehensive destination guides that cater to every type of
        traveler.
      </p>
      <div className="py-20 flex md:flex-row flex-col items-center gap-10">
        <div className="md:w-1/2 w-full">
          <Image
            src={aboutImage}
            alt="about us"
            width={500}
            height={500}
            className="w-full rounded-xl"
          />
        </div>
        <div className="md:w-1/2 sm:w-2/3 w-full">
          <h3 className="capitalize font-bold text-2xl py-5 text-sky-400">mission</h3>
          <p>
            Our mission is to empower travelers by providing them with the
            knowledge and tools they need to plan unforgettable, stress-free
            journeys. Through carefully curated travel tips and in-depth
            destination guides, we aim to inspire exploration while making
            travel more accessible, enjoyable, and enriching for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
