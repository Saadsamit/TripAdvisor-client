"use server"

import axiosInstance from "@/src/libs/axios";

export type TUserRoleUpdate ={
    id:string;
    role: string;
}

export const getAllUserApi = async () => {
  const { data } = await axiosInstance.get("/user/all-user");
  return data;
};

export const userRoleUpdateApi = async (data: TUserRoleUpdate) => {
    const { data: axiosData } = await axiosInstance.put(`/auth/role-update/${data.id}`, {role: data.role});
    return axiosData;
  };
