"use client";

import Link from "next/link";
import Button from "../components/UI/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <h2 className="text-xl font-bold text-center">
        {error.message ? error.message : "Something went wrong!"}
      </h2>
      <Link href={"/"}>
        <Button onClick={() => reset()}>Try again</Button>
      </Link>
    </div>
  );
}
