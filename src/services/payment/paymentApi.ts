"use server";

import axiosInstance from "@/src/libs/axios";
import { redirect } from "next/navigation";

export const paymentApi = async () => {
    const { data } = await axiosInstance.post("/payment/profile-verified");
    if (data?.success) {
      redirect(data?.data?.payment_url)
    }
};
