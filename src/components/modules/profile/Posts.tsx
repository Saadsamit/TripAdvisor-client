"use client";

import postService from "@/src/services/posts/postService";
import ProfilePostCard from "./ProfilePostCard";

import { TPost } from "@/src/types/post";
import { Skeleton } from "@nextui-org/skeleton";
import { Card, CardBody, CardFooter } from "@nextui-org/card";

const Posts = ({ id }: { id?: string }) => {
  const { data, isPending, isFetching, isLoading } = id
    ? postService.getAUserPost(id)
    : postService.myPosts();

  if (isLoading || isFetching || isPending)
    return (
      <div className="py-4 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {[...Array(9)].map(() => (
          <Card>
            <CardBody className="p-3 overflow-visible text-small">
              <Skeleton className="h-6 w-full rounded-md sm:mx-0 mx-auto" />
              <Skeleton className="h-6 w-full mt-2 rounded-md sm:mx-0 mx-auto" />
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <Skeleton className="h-6 w-5 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
              <div className="flex gap-1">
                <Skeleton className="h-6 w-5 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );

  return data?.data?.length ? (
    <div className="py-4 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      {data?.data?.map((item: TPost) => (
        <ProfilePostCard data={item} />
      ))}
    </div>
  ) : (
    <div className="capitalize text-lg font-bold flex text-center justify-center items-center min-h-[calc(507px)]">
      no data found
    </div>
  );
};

export default Posts;
