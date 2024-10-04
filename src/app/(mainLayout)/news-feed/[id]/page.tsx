"use client"

import Comment from "@/src/components/modules/news-feed/Comment";
import PostCard from "@/src/components/modules/news-feed/PostCard";
import Container from "@/src/components/UI/Container";
import postService from "@/src/services/posts/postService";

const page = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isPending, isFetching, isLoading } = postService.getAPost(id);

  if (isLoading || isFetching || isPending) "loading";
  return <Container className="my-10">
    <div className="grid md:grid-cols-2 gap-5">
      <PostCard data={data?.data}/>
      <Comment />
    </div>
  </Container>;
};

export default page;
