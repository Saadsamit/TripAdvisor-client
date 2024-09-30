"use client";

import Button from "@/src/components/UI/Button";
import MyInput from "@/src/components/UI/MyInput";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import authService from "@/src/services/authService/authService";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/src/Schemas/AuthSchemas";

const page = () => {
  const router = useRouter();
  const { mutate: signupMutate, isPending, data } = authService.signUp();
  const methods = useForm({
    resolver: zodResolver(signupSchema),
  });
  const { handleSubmit } = methods;
  
  if (data?.success) {
    router.push("/login");
  }

  return (
    <div className="border-sky-400 border shadow-xl w-96 rounded-xl p-4 ">
      <h3 className="text-center text-3xl font-bold mb-5 text-sky-400">
        Sign Up
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data) => signupMutate(data))}>
          <MyInput label="picture" type="text" />
          <MyInput label="name" type="text" />
          <MyInput label="email" type="email" />
          <MyInput label="password" type="password" />
          <Button type="submit" className="w-full" loading={isPending}>
            Sign Up
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
