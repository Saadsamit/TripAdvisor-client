"use server";

import axiosInstance from "@/src/libs/axios";
import { FieldValues } from "react-hook-form";

export const commentApi = async (data: FieldValues) => {
  const res = await axiosInstance.post(`/comments/create`, data);
  return res?.data;
};

export const allCommentApi = async (id: string) => {
  const { data } = await axiosInstance.get(`/comments/${id}`);
  return data;
};

export const deleteCommentApi = async (postId: string, id: string) => {
  const { data } = await axiosInstance.delete(`/comments/${postId}/${id}`);
  return data;
};
