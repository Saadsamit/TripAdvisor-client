import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { allCommentApi, commentApi, deleteCommentApi } from "./commentApi";
import toastTheme from "@/src/styles/toastTheme";
import toast from "react-hot-toast";

const createComment = () => {
  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: async (data: FieldValues) => await commentApi(data),
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

const deteleComment = (postId: string) => {
  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: async (id: string) => await deleteCommentApi(postId, id),
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

const allComment = (id: string) => {
  return useQuery({
    queryKey: [`allComment`],
    queryFn: async () => await allCommentApi(id),
    enabled: !!id,
  });
};

const commentService = {
  createComment,
  allComment,
  deteleComment
};

export default commentService;
