"use server";

import axiosInstance from "@/src/libs/axios";
import { FieldValues } from "react-hook-form";

export const createCategoryApi = async (data: FieldValues) => {
  const res = await axiosInstance.post(`/category/create`, data);
  return res?.data;
};

export const allCategoryApi = async (limit?: number) => {
  const { data } = await axiosInstance.get(`/category`, {
    params: limit,
  });
  return data;
};
