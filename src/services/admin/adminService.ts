import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUserApi, TUserRoleUpdate, userRoleUpdateApi } from "./adminApi";
import toastTheme from "@/src/styles/toastTheme";
import toast from "react-hot-toast";

const getAllUser = () => {
  return useQuery({
    queryKey: ["getAllUser"],
    queryFn: async () => await getAllUserApi(),
  });
};

const updateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateUserRole"],
    mutationFn: async (data: TUserRoleUpdate) => await userRoleUpdateApi(data),
    onSettled(data) {
      if (data?.success) {
        toast.success(data?.message, { ...toastTheme });
        queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
      console.log(data);
    },
  });
};

const adminService = {
  getAllUser,
  updateUserRole,
};

export default adminService;
