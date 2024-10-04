"use client";

import postService from "@/src/services/posts/postService";
import { TPost } from "@/src/types/post";
import { useUser } from "@/src/utils/Provider/UserProvider";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Link from "next/link";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import comfirmAlert from "@/src/utils/comfirmAlert";
import { useRouter } from "next/navigation";
import MyModel from "../../UI/MyModel";
import { useDisclosure } from "@nextui-org/modal";
import MyEditor from "../../UI/MyEditor";
import { useEffect, useState } from "react";

const PostCard = ({ data, feedPage }: { data: TPost; feedPage?: boolean }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { user } = useUser();
  const [value, setValue] = useState(data?.post);
  const { mutate: deletePostMutate, data: deleteData } =
    postService.myDeletePost();
  const {
    mutate: updatePostMutate,
    data: updateData,
    isPending: updatePending,
  } = postService.myUpdatePost(data?._id);
  const { mutate: followUserMutate, isPaused: followUserPaused } =
    postService.followUser();
  const { mutate: postLikeMutate, isPaused: postLikePaused } =
    postService.postLike();
  const { mutate: postDislikeMutate, isPaused: postDislikePaused } =
    postService.postDislike();
  const Follow = data?.user?.followers.includes(user?._id as string);
  const Upvote = data?.upvote?.includes(user?._id as string);
  const Downvote = data?.downvote?.includes(user?._id as string);

  if (deleteData?.success) {
    router.push("/");
  }
  useEffect(()=>{
    if (updateData?.success) {
      onOpenChange();
    }
  },[updateData?.success])

  const cardBody = (
    <CardBody className="p-3 overflow-visible text-small">
      <div dangerouslySetInnerHTML={{ __html: data?.post }} />
    </CardBody>
  );
  return (
    <div>
      <Card className={`${!feedPage && "h-fit"}`}>
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={data?.user?.picture}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <Link
                href={`/profile/${data?.user?._id}`}
                className="text-small font-semibold leading-none text-default-600 flex flex-wrap items-center hover:underline"
              >
                {data?.user?.name}{" "}
                {data?.user?.verified && (
                  <VscVerifiedFilled className="text-sky-400 text-lg ml-2" />
                )}
              </Link>
            </div>
          </div>
          {data?.user?._id === user?._id ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly size="sm" className="bg-transparent text-xl">
                  <BsThreeDots />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem key="edit" onClick={onOpen}>
                  <div className="flex flex-wrap items-center">
                    <FaRegEdit className="text-lg mr-1" /> Edit Post
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  color="danger"
                  onClick={()=>comfirmAlert(() => deletePostMutate(data?._id))}
                >
                  <div className="flex flex-wrap items-center">
                    <MdDeleteForever className="text-xl" /> Delete Post
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              className={
                Follow
                  ? "bg-transparent text-foreground border border-sky-400"
                  : "bg-sky-400 text-white"
              }
              size="sm"
              isLoading={followUserPaused}
              onClick={() => followUserMutate(data?.user?._id)}
            >
              {Follow ? "Unfollow" : "Follow"}
            </Button>
          )}
        </CardHeader>
        {feedPage ? (
          <Link href={`/news-feed/${data?._id}`}>{cardBody}</Link>
        ) : (
          cardBody
        )}
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <Button
              size="sm"
              className={`rounded-xl text-small ${
                Upvote
                  ? "bg-sky-400 text-white"
                  : "bg-transparent text-foreground border border-sky-400"
              }`}
              isLoading={postLikePaused}
              onClick={() => postLikeMutate(data?._id)}
            >
              {data?.upvote?.length}
              {postLikePaused || (Upvote ? <BiSolidUpvote /> : <BiUpvote />)}
            </Button>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              className={`rounded-xl text-small ${
                Downvote
                  ? "bg-sky-400 text-white"
                  : "bg-transparent text-foreground border border-sky-400"
              }`}
              isLoading={postDislikePaused}
              onClick={() => postDislikeMutate(data?._id)}
            >
              {data?.downvote?.length}
              {postDislikePaused ||
                (Downvote ? <BiSolidDownvote /> : <BiDownvote />)}
            </Button>
          </div>
        </CardFooter>
      </Card>
      <MyModel
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="update post"
      >
        <MyEditor value={value} setValue={setValue} />
        <div className="text-center">
          <Button
            isLoading={updatePending}
            onClick={()=> updatePostMutate({ post: value })}
            className="bg-sky-400 text-white"
          >
            Update Post
          </Button>
        </div>
      </MyModel>
    </div>
  );
};

export default PostCard;
