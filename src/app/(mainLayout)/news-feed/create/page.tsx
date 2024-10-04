"use client";

import Button from "@/src/components/UI/Button";
import Container from "@/src/components/UI/Container";
import MyEditor from "@/src/components/UI/MyEditor";
import postService from "@/src/services/posts/postService";
import { useUser } from "@/src/utils/Provider/UserProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const router = useRouter();
  const { user } = useUser();
  const { mutate: postMutate, isPending, data } = postService.createPost();
  const [value, setValue] = useState("");

  if (data?.success) {
    router.push("/news-feed");
  }
console.log(data);
  const onSubmit = () => {
    postMutate({ post: value });
  };
  return (
    <Container>
      <MyEditor value={value} setValue={setValue} />
      <div className="text-center">
        <Button loading={isPending} onClick={onSubmit} className="mb-5">Post</Button>
      </div>
    </Container>
  );
};

export default page;
