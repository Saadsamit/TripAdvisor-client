"use client";

import { Button as NextUiButton } from "@nextui-org/button";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Container from "@/src/components/UI/Container";

const NewsFeedNav = () => {
  const router = useRouter();
  console.log(router);
  return (
    <div className="border-b">
      <Container>
        <NextUiButton
          isIconOnly
          className="bg-transparent text-xl hover:text-sky-400"
          onClick={() => router.push("/")}
        >
          <IoArrowBackOutline />
        </NextUiButton>
      </Container>
    </div>
  );
};

export default NewsFeedNav;
