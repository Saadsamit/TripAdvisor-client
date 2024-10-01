import { Textarea } from "@nextui-org/input";
import { Controller } from "react-hook-form";


type TMyTextArea = {
    label: string;
    name?: string;
  };

const MyTextArea = ({ label, name}: TMyTextArea) => {
    let InputName = name;
  if (!name) InputName = label;
    return (
        <Controller
      name={InputName as string}
      render={({ field, fieldState: { error } }) => (
        <Textarea
        {...field}
        isInvalid={!!error?.message}
          errorMessage={error?.message || "Something went wrong!"}
          variant={"bordered"}
          label={label}
          labelPlacement="outside"
          placeholder="Enter your description"
          classNames={{
            label: "capitalize",
            inputWrapper: [
                "mb-3"
            ]
          }}
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
        />
      )}
    />
    );
};

export default MyTextArea;