"use client";

import Button from "@/src/components/UI/Button";
import MyInput from "@/src/components/UI/MyInput";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

const page = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="border-sky-400 border shadow-xl w-96 rounded-xl p-4 ">
        <h3 className="text-center text-3xl font-bold mb-5 text-sky-400">Sign Up</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MyInput label="picture" type="text" required={true} />
          <MyInput label="name" type="text" required={true} />
          <MyInput label="email" type="email" required={true} />
          <MyInput label="password" type="password" required={true} />
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
