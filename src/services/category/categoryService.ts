import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toastTheme from "@/src/styles/toastTheme";
import toast from "react-hot-toast";
import { allCategoryApi, createCategoryApi } from "./categoryApi";

const createCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: async (data: FieldValues) => await createCategoryApi(data),
    onSettled(data) {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["allCategory"] });
        toast.success(data?.message, { ...toastTheme });
      } else {
        toast.error(data?.message || "Something went wrong!", {
          ...toastTheme,
        });
      }
    },
  });
};

const allCategory = (enabled: string, limit?: number) => {
  return useQuery({
    queryKey: [`allCategory`],
    queryFn: async () => await allCategoryApi(),
    enabled: !!enabled,
  });
};

const categoryService = {
  createCategory,
  allCategory,
};

export default categoryService;
