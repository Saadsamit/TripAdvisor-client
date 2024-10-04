"use server";

import axiosInstance from "@/src/libs/axios";
import { FieldValues } from "react-hook-form";

export const postApi = async (data: FieldValues) => {
  const res = await axiosInstance.post(`/post/create`, data);
  return res?.data;
};

export const getMyPost = async () => {
  const { data } = await axiosInstance.get(`/post/my-posts`);
  return data;
};

export const myGetAPost = async (id: string) => {
  const { data } = await axiosInstance.get(`/post/${id}`);
  return data;
};

export const postLikeApi = async (id: string) => {
  const res = await axiosInstance.post(`/post/like/${id}`);
  return res?.data;
};

export const postDislikeApi = async (id: string) => {
  const res = await axiosInstance.post(`/post/dislike/${id}`);
  return res?.data;
};

export const followUserApi = async (id: string) => {
  const res = await axiosInstance.post(`/post/follow/${id}`);
  return res?.data;
};