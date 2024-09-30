"use server";

import axiosInstance from "@/src/libs/axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const authApi = async (data:FieldValues)=>{
    const res = await axiosInstance.post(`/auth/login`, data);
    if(res?.data?.token){
        cookies().set("accessToken", `Bearer ${res?.data?.token}`);
    }
    return res?.data
}