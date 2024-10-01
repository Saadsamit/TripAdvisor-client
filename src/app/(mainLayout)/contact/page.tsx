"use client";

import Container from "@/src/components/UI/Container";
import contectImage from "@/src/assets/contact us.jpg";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import MyInput from "@/src/components/UI/MyInput";
import Button from "@/src/components/UI/Button";
import MyTextArea from "@/src/components/UI/MyTextArea";
import CommonBanner from "@/src/components/UI/CommonBanner";

const page = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  return (
    <Container>
      <CommonBanner />
      <h3 className="capitalize font-bold text-3xl py-5 text-center text-sky-400">
        contect us
      </h3>
      <div className="pb-20 flex md:flex-row flex-col items-center gap-10">
        <div className="md:w-1/2 md:block hidden">
          <Image
            src={contectImage}
            alt="contect us"
            width={500}
            height={500}
            className="w-full"
          />
        </div>
        <div className="md:w-1/2 sm:w-2/3 w-full">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <MyInput label="name" type="text" />
              <MyInput label="email" type="email" />
              <MyTextArea label="message" />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  );
};

export default page;
