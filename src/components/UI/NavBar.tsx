"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/src/config/site";
import Button from "./Button";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <NextUINavbar shouldHideOnScroll>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit text-sky-500">
          TripAdvisor
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.navItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              className={`${
                pathname === item.href
                  ? "bg-sky-400 text-white"
                  : "text-sky-400}"
              } px-2 py-1 rounded-lg`}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button link="/login">Login</Button>
        </NavbarItem>
        <NavbarItem className="sm:hidden basis-1 pl-4">
          <NavbarMenuToggle />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={`${
                  pathname === item.href
                    ? "bg-sky-400 text-white"
                    : "text-sky-400}"
                } px-2 py-1 rounded-lg block text-center`}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
