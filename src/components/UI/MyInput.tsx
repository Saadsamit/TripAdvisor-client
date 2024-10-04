"use client";

import { Input } from "@nextui-org/input";
import { HTMLInputTypeAttribute } from "react";
import { Controller } from "react-hook-form";

type TInput = {
  type: HTMLInputTypeAttribute;
  label?: string;
  name?: string;
};

const MyInput = ({ type, label, name }: TInput) => {
  let InputName = name;
  if (!name) InputName = label;
  return (
    <Controller
      name={InputName as string}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          classNames={{
            label: "capitalize",
            inputWrapper: ["mb-3"],
          }}
          type={type}
          label={label}
          isInvalid={!!error?.message}
          errorMessage={error?.message || "Something went wrong!"}
          variant={"bordered"}
        />
      )}
    />
  );
};

export default MyInput;
