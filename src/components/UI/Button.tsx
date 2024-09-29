import { Button as NextButton } from "@nextui-org/button";
import Link from "next/link";
import { MouseEventHandler } from "react";

type props = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  link?: string;
};

const Button = ({ children, onClick, link }: props) => {
  const button = (
    <NextButton onClick={onClick} className="bg-sky-400 text-white">
      {children}
    </NextButton>
  );

  if (link) {
    return <Link href={link}>{button}</Link>;
  }

  return button;
};

export default Button;
