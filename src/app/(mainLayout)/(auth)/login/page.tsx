"use client";

import Button from "@/src/components/UI/Button";
import MyInput from "@/src/components/UI/MyInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogInScheme } from "@/src/Schemas/AuthSchemas";
import authService from "@/src/services/authService/authService";

const page = () => {
  const { mutate: loginMutate, isPending, error,isError,data } = authService.login();
  const methods = useForm({
    resolver: zodResolver(LogInScheme),
    defaultValues: {
      email: "john.doe@example.com",
      password: "si20022",
    },
  });
  const { handleSubmit } = methods;

  if(isError){
    console.log(error.message);
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    loginMutate(data)

  };
  return (
    <div className="border-sky-400 border shadow-xl w-96 rounded-xl p-4 ">
      <h3 className="text-center text-3xl font-bold mb-5 text-sky-400">
        Login
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
