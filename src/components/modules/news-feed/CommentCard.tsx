"use client"

import { TComments } from "@/src/types/comment";
import { useUser } from "@/src/utils/Provider/UserProvider";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";
import { Tooltip } from "@nextui-org/tooltip";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { MdDeleteForever } from "react-icons/md";
import comfirmAlert from "@/src/utils/comfirmAlert";
import commentService from "@/src/services/comments/commentService";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useEffect } from "react";

const CommentCard = ({
  data,
  refetch,
}: {
  data: TComments;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const { user } = useUser();
  const { mutate: commentDeleteMutate, data: commentDelete } =
    commentService.deteleComment(data?.postId);

  useEffect(() => {
    if (commentDelete?.success) {
      refetch();
    }
  }, [commentDelete?.success]);

  return data?.comments?.map((item) => (
    <div className="mb-5 flex gap-4 items-center">
      <Link
        href={
          item?.user?._id === user?._id
            ? "/profile"
            : `/profile/${item?.user?._id}`
        }
      >
        <Tooltip
          showArrow={true}
          placement="bottom"
          content={
            item?.user?.verified ? (
              <p className="flex gap-1 items-center">
                {item?.user?.name}{" "}
                <VscVerifiedFilled className="text-sky-400" />
              </p>
            ) : (
              item?.user?.name
            )
          }
        >
          <Avatar
            isBordered
            radius="full"
            size="sm"
            src={item?.user?.picture}
          />
        </Tooltip>
      </Link>
      <Card key={item?._id} className="w-fit overflow-y-visible">
        <CardBody>
          <p>{item?.comment}</p>
        </CardBody>
      </Card>
      {(data?.postUser === user?._id || item?.user?._id === user?._id) && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly size="sm" className="bg-transparent text-xl">
              <BsThreeDots />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat">
            <DropdownItem
              key="delete"
              color="danger"
              onClick={() => comfirmAlert(() => commentDeleteMutate(item?._id))}
            >
              <div className="flex flex-wrap items-center">
                <MdDeleteForever className="text-xl" /> Delete
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  ));
};

export default CommentCard;
