"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import UserProvider from "./UserProvider";

export function Providers({ children, token }: { children: React.ReactNode, token: string | undefined }) {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <UserProvider token={token}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        <Toaster />
      </QueryClientProvider>
    </UserProvider>
  );
}
