"use client";

import postService from "@/src/services/posts/postService";
import { TPost } from "@/src/types/post";
import { useUser } from "@/src/utils/Provider/UserProvider";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import Link from "next/link";
import { useState } from "react";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";

const PostCard = ({ data, feedPage }: { data: TPost; feedPage?: boolean }) => {
  const { user } =  useUser()
  const { mutate: followUserMutate, isPaused: followUserPaused } = postService.followUser();
  const { mutate: postLikeMutate, isPaused: postLikePaused } = postService.postLike();
  const { mutate: postDislikeMutate, isPaused: postDislikePaused } = postService.postDislike();
  const Follow = data?.user?.followers.includes(user?._id as string);
  const Upvote = data?.upvote?.includes(user?._id as string);
  const Downvote = data?.downvote?.includes(user?._id as string);

  const cardBody = (
    <CardBody className="p-3 overflow-visible text-small">
      <div dangerouslySetInnerHTML={{ __html: data?.post }} />
    </CardBody>
  );
  console.log(data);
  return (
    <Card className={`${!feedPage && "h-fit"}`}>
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://nextui.org/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <Link
              href={`/profile/${data?.user?._id}`}
              className="text-small font-semibold leading-none text-default-600 hover:underline"
            >
              Zoey Lang
            </Link>
          </div>
        </div>
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
            {postDislikePaused || (Downvote ? <BiSolidDownvote /> : <BiDownvote />)}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
