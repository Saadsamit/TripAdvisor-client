import toastTheme from "@/src/styles/toastTheme";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { postApi } from "./postApi";


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

const postService = {
    createPost
}

export default postService