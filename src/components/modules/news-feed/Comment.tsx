"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import toastTheme from "@/src/styles/toastTheme";
import { useState } from "react";

const Comment = () => {
  const [isDisabled, setIsDisabled] = useState("")
  const methods = useForm();
  const { handleSubmit } = methods;
  const commentData = null;
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(!data?.comment) toast.error("E", { ...toastTheme });
    console.log(data);
  };
  return (
    <Card className="border rounded-xl p-4 h-[calc(100vh-200px)] pb-20">
      <CardHeader className="border-b">
        <h3 className="font-bold text-xl">Comments</h3>
      </CardHeader>
      <CardBody className="overflow-y-scroll mt-2">
        {commentData ? "" : <div className="flex justify-center items-center h-full">no comment</div>}
      </CardBody>
      <CardFooter className="absolute bottom-0 left-0 right-0 w-full">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Controller
              name={"comment"}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  classNames={{
                    label: "capitalize",
                  }}
                  onChange={(e)=> setIsDisabled(e.target.value)}
                  placeholder="Write a comment…"
                  endContent={
                    <Button isIconOnly isDisabled={!isDisabled.length} type="submit" className="bg-transparent" size="sm"><IoSend /></Button>
                  }
                  type="text"
                  isInvalid={!!error?.message}
                  errorMessage={error?.message || "Something went wrong!"}
                  variant={"bordered"}
                />
              )}
            />
          </form>
        </FormProvider>
      </CardFooter>
    </Card>
  );
};

export default Comment;
