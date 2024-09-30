import { FieldValues } from "react-hook-form";
import { authApi } from "./authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import toastTheme from "@/src/styles/toastTheme";

const login = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: FieldValues) => await authApi(data),
    onSettled(data) {
        if(data?.success){
            toast.success(data?.message,{ ...toastTheme})
        }else{
            toast.error(data?.message || "Something went wrong!", { ...toastTheme})
        }
    },
  });
};

const authService = {
  login,
};

export default authService;
