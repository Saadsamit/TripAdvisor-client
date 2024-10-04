"use client";

import { useDisclosure } from "@nextui-org/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import MyModel from "@/src/components/UI/MyModel";
import { Button as NextUiButton } from "@nextui-org/button";
import { FaRegEdit } from "react-icons/fa";
import Button from "@/src/components/UI/Button";
import MyInput from "@/src/components/UI/MyInput";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

import authService from "@/src/services/authService/authService";

import { updateUserSchema } from "@/src/Schemas/AuthSchemas";
import { TUser } from "@/src/types/userType";

type props = {
  userData: TUser;
};

const EditProfile = ({ userData }: props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: updateMutate, isPending, data, error } = authService.updateUser();
  const methods = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: userData,
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FieldValues> = async (data)=>{
    await updateMutate(data)
    onOpenChange()
  }

  return (
    <div className="text-end">
      <NextUiButton
        onClick={onOpen}
        size="sm"
        isIconOnly
        variant="light"
        className="text-sm"
      >
        <FaRegEdit />
      </NextUiButton>
      <MyModel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="update profile"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MyInput label="picture" type="text" />
            <MyInput label="name" type="text" />
            <Button type="submit" className="w-full" loading={isPending}>
              update
            </Button>
          </form>
        </FormProvider>
      </MyModel>
    </div>
  );
};

export default EditProfile;
