import { Button as NextButton } from "@nextui-org/button";
import Link from "next/link";
import { MouseEventHandler } from "react";

type props = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  link?: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  loading?: boolean;
};

const Button = ({
  children,
  onClick,
  link,
  type,
  className,
  loading,
}: props) => {
  const button = (
    <NextButton
      isLoading={loading}
      type={type}
      onClick={onClick}
      className={`bg-sky-400 text-white ${className}`}
    >
      {children}
    </NextButton>
  );

  if (link) {
    return <Link href={link}>{button}</Link>;
  }

  return button;
};

export default Button;
