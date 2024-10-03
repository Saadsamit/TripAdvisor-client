"use server";

import axiosInstance from "@/src/libs/axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { TcurrentUser } from "@/src/types/userType";

export const signUpApi = async (data: FieldValues) => {
  const res = await axiosInstance.post(`/auth/signup`, data);
  return res?.data;
};

export const loginApi = async (data: FieldValues) => {
  const res = await axiosInstance.post(`/auth/login`, data);
  if (res?.data?.token) {
    cookies().set("accessToken", `Bearer ${res?.data?.token}`);
  }
  return res?.data;
};

export const getCurrentUser = () => {
  const token = cookies().get("accessToken")?.value.split(" ")[1];
  let decoded: TcurrentUser | null = null;
  if (token) {
    decoded = jwtDecode(token as string);
  }
  return decoded;
};

export const updateUserApi = async (data: FieldValues) => {
  const res = await axiosInstance.patch(`/auth/update-profile`, data);
  if (res?.data?.token) {
    cookies().set("accessToken", `Bearer ${res?.data?.token}`);
  }
  return res?.data;
};

export const LogOut = async () => {
  await cookies().delete("accessToken");
};

export const MyProfileApi = async () => {
  try {
    const { data } = await axiosInstance.get("/user/my-profile");
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
