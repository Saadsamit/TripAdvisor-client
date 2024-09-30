import { Button } from "@nextui-org/button";
import Container from "./Container";
import { FaFacebook, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa6";
import { navItems } from "@/src/config/navLinks";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="bg-sky-200 py-20">
        <Container>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Button
              isIconOnly
              className="text-xl flex justify-center items-center size-40 rounded-full bg-white text-sky-400"
            >
              <FaFacebook />
            </Button>
            <Button
              isIconOnly
              className="text-xl flex justify-center items-center size-40 rounded-full bg-white text-sky-400"
            >
              <RiInstagramFill />
            </Button>
            <Button
              isIconOnly
              className="text-xl flex justify-center items-center size-40 rounded-full bg-white text-sky-400"
            >
              <FaTwitter />
            </Button>
            <Button
              isIconOnly
              className="text-xl flex justify-center items-center size-40 rounded-full bg-white text-sky-400"
            >
              <FaLinkedinIn />
            </Button>
            <Button
              isIconOnly
              className="text-xl flex justify-center items-center size-40 rounded-full bg-white text-sky-400"
            >
              <FaYoutube />
            </Button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 pt-4">
            {navItems.map((item) => (
              <Link href={item?.href} className="hover:underline">
                {item?.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
      <div className="bg-sky-100">
        <Container>
          <p className="text-center py-2">
            © 2024 TripAdvisor™. All Rights Reserved.
          </p>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
