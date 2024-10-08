import { FieldValues } from "react-hook-form";
import {
  getAUserApi,
  loginApi,
  myFollowersApi,
  myFollowingApi,
  MyProfileApi,
  signUpApi,
  updateUserApi,
} from "./authApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import toastTheme from "@/src/styles/toastTheme";

const signUp = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: FieldValues) => await signUpApi(data),
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

const login = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: FieldValues) => await loginApi(data),
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

const updateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data: FieldValues) => await updateUserApi(data),
    onSettled(data) {
      if (data?.success) {
        toast.success(data?.message, { ...toastTheme });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const myProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => await MyProfileApi(),
  });
};

const myFollowers = () => {
  return useQuery({
    queryKey: ["myFollowers"],
    queryFn: async () => await myFollowersApi(),
  });
};

const myFollowing = () => {
  return useQuery({
    queryKey: ["myFollowing"],
    queryFn: async () => await myFollowingApi(),
  });
};

const getAUser = (id: string) => {
  return useQuery({
    queryKey: ["getAUser", id],
    queryFn: async () => await getAUserApi(id),
    enabled: !!id,
  });
};

const authService = {
  login,
  signUp,
  updateUser,
  myProfile,
  myFollowers,
  myFollowing,
  getAUser,
};

export default authService;
