"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import toastTheme from "@/src/styles/toastTheme";
import { useEffect, useState } from "react";
import commentService from "@/src/services/comments/commentService";
import CommentLoading from "./CommentLoading";
import CommentCard from "./CommentCard";

const Comment = ({ id, postId }: { id: string; postId: string }) => {
  const {
    data: allComment,
    isPending,
    isLoading,
    isFetching,
    refetch,
  } = commentService.allComment(id);
  const {
    mutate: createCommentMutate,
    isPending: createCommentPending,
    data: createData,
  } = commentService.createComment();
  const [value, setValue] = useState("");
  const methods = useForm();
  const { handleSubmit } = methods;

  useEffect(() => {
    if (createData?.success) {
      refetch();
      setValue("");
    }
  }, [createData?.success]);

  const onSubmit = async () => {
    if (!value.length) return toast.error("enter a comment", { ...toastTheme });
    await createCommentMutate({ postId, comment: value, commentId: id });
  };

  if (isLoading || isPending || isFetching) return <CommentLoading />;
  
  return (
    <Card className="border rounded-xl p-4 h-[calc(100vh-200px)] pb-20">
      <CardHeader className="border-b">
        <h3 className="font-bold text-xl">Comments</h3>
      </CardHeader>
      <CardBody className="overflow-y-scroll  mt-2">
        {allComment?.data?.comments?.length ? (
          <CommentCard data={allComment.data} refetch={refetch}/>
        ) : (
          <div className="flex justify-center items-center h-full">
            no comment
          </div>
        )}
      </CardBody>
      <CardFooter className="absolute bottom-0 left-0 right-0 w-full">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              classNames={{
                label: "capitalize",
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write a comment…"
              endContent={
                <Button
                  isIconOnly
                  isLoading={createCommentPending}
                  isDisabled={!value.length}
                  type="submit"
                  className="bg-transparent"
                  size="sm"
                >
                  {createCommentPending || <IoSend />}
                </Button>
              }
              type="text"
              variant={"bordered"}
            />
          </form>
        </FormProvider>
      </CardFooter>
    </Card>
  );
};

export default Comment;
