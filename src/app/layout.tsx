import "@/src/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import { Providers } from "../utils/Provider/providers";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.icon,
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("accessToken")?.value.split(' ')[1]
  
  return (
    <html suppressHydrationWarning lang="en">
      <body className={clsx("font-sans", fontSans.variable)}>
        <Providers token={token}>{children}</Providers>
      </body>
    </html>
  );
}
