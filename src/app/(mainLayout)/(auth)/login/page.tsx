"use client";

import Button from "@/src/components/UI/Button";
import MyInput from "@/src/components/UI/MyInput";
import {
  FormProvider,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogInScheme } from "@/src/Schemas/AuthSchemas";
import authService from "@/src/services/authService/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { mutate: loginMutate, isPending, isSuccess, data} = authService.login();
  const methods = useForm({
    resolver: zodResolver(LogInScheme),
    defaultValues: {
      email: "john.doe@example.com",
      password: "si2002",
    },
  });
  const { handleSubmit } = methods;

  if(data?.success){
    router.push("/")
  }

  useEffect(() => {
    if (data?.success) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="border-sky-400 border shadow-xl w-96 rounded-xl p-4 bg-white ">
      <h3 className="text-center text-3xl font-bold mb-5 text-sky-400">
        Login
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data) => loginMutate(data))}>
          <MyInput label="email" type="email" />
          <MyInput label="password" type="password" />
          <Button loading={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
