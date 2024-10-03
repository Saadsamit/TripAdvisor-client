"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { envConfig } from "../config/envConfig";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: envConfig.serverUrl as string,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookies().get("accessToken")?.value;
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
 async (error) => {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      Promise.reject(error)
      return redirect("/login")
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
