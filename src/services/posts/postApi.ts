"use server";

import axiosInstance from "@/src/libs/axios";
import { FieldValues } from "react-hook-form";

export const postApi = async (data: FieldValues) => {
    const res = await axiosInstance.post(`/post/create`, data);
    return res?.data;
  };