"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { ReactNode } from "react";

type props = {
  isOpen: boolean;
  onOpenChange: () => void;
  children: ReactNode;
  title: string;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl" | "5xl" | "full" | undefined;
};

const MyModel = ({ isOpen, onOpenChange, footer, title, children, size  }: props) => {
  return (
    <>
      <Modal size={size} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex justify-center">{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModel;
