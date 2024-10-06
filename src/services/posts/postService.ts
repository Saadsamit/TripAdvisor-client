import toastTheme from "@/src/styles/toastTheme";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getMyPost,
  postApi,
  myGetAPost,
  postLikeApi,
  postDislikeApi,
  followUserApi,
  myDeletePostApi,
  myUpdatePostApi,
  getAUserPostApi,
  getAllPostApi,
} from "./postApi";
import { TgetAllPost } from "@/src/types/ApiTypes";

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

const myDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (id: string) => await myDeletePostApi(id),
    onSettled(data) {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: [`myPosts`] });
        toast.success(data?.message, { ...toastTheme });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const myUpdatePost = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: async (data: FieldValues) => await myUpdatePostApi(id, data),
    onSettled(data) {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: [`getAPost`, id] });
        toast.success(data?.message, { ...toastTheme });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const getAPost = (id: string) => {
  return useQuery({
    queryKey: [`getAPost`, id],
    queryFn: async () => await myGetAPost(id),
  });
};

const getAUserPost = (id: string) => {
  return useQuery({
    queryKey: [`getAUserPost`, id],
    queryFn: async () => await getAUserPostApi(id),
    enabled: !!id,
  });
};

const postLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postLike"],
    mutationFn: async (id: string) => await postLikeApi(id),
    onSettled(data) {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: [`getAPost`] });
        queryClient.invalidateQueries({ queryKey: ["getAllPost"] });
        toast.success(data?.message, { ...toastTheme });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const postDislike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postDislike"],
    mutationFn: async (id: string) => await postDislikeApi(id),
    onSettled(data) {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: [`getAPost`] });
        queryClient.invalidateQueries({ queryKey: ["getAllPost"] });
        toast.success(data?.message, { ...toastTheme });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const followUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["followUser"],
    mutationFn: async (id: string) => await followUserApi(id),
    onSettled(data) {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: [`getAPost`] });
        queryClient.invalidateQueries({ queryKey: ["getAllPost"] });
        toast.success(data?.message, { ...toastTheme });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const getAllPost = (data: TgetAllPost) => {
  return useInfiniteQuery({
    queryKey: ['getAllPost'],
    queryFn: async ({ pageParam = 1 }) => await getAllPostApi(pageParam, data),
    initialPageParam: 1,
    refetchInterval: 5000,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    
  });
};

const postService = {
  createPost,
  myPosts,
  getAPost,
  postLike,
  postDislike,
  followUser,
  myDeletePost,
  myUpdatePost,
  getAUserPost,
  getAllPost,
};

export default postService;
