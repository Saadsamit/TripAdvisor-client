"use client"

import Container from "@/src/components/UI/Container";
import postService from "@/src/services/posts/postService";

const page = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isPending, isFetching, isLoading } = postService.getAPost(id);

  if (isLoading || isFetching || isPending) "loading";

  console.log(data);
  return <Container className="my-10">{id}</Container>;
};

export default page;
