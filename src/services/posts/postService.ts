import toastTheme from "@/src/styles/toastTheme";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { getMyPost, postApi, myGetAPost } from "./postApi";

const createPost = () => {
  return useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data: FieldValues) => await postApi(data),
    onSettled(data) {
      if (data?.success) {
        toast.success(data?.message, { ...toastTheme });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const myPosts = () => {
  return useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => await getMyPost(),
  });
};

const getAPost = (id: string) => {
  return useQuery({
    queryKey: [`myPosts`],
    queryFn: async () => await myGetAPost(id),
  });
};

const postService = {
  createPost,
  myPosts,
  getAPost
};

export default postService;
