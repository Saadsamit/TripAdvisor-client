"use client";
import { IoArrowBackOutline } from "react-icons/io5";

import { Button as NextUiButton } from "@nextui-org/button";
import { usePathname, useRouter } from "next/navigation";
import Container from "@/src/components/UI/Container";
import Button from "@/src/components/UI/Button";

const AuthLayoutHeader = () => {
    const pathname = usePathname();
    const router = useRouter()
    return (
        <Container className="pt-4">
            <div className="flex justify-between items-center">
            <NextUiButton isIconOnly className="bg-transparent text-xl hover:text-sky-400" onClick={()=>router.back()}><IoArrowBackOutline /></NextUiButton>
            {
                pathname === "/login" ? <Button link="/signup">Sign Up</Button> : <Button link="/login">Login</Button>
            }
            
            </div>
        </Container>
    );
};

export default AuthLayoutHeader;