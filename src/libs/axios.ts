"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { envConfig } from "../config/envConfig";

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
  (error) => {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      cookies().delete("accessToken");
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
