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
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/src/config/site";
import Button from "./Button";
import { Button as NextUiButton } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/src/utils/Provider/UserProvider";
import { LogOut } from "@/src/services/authService/authApi";
import { privateRoute } from "@/src/constant";
import { CiSquarePlus } from "react-icons/ci";
import { HiSelector } from "react-icons/hi";
import { userRole } from "@/src/const/user";
import postService from "@/src/services/posts/postService";
import { useEffect, useState } from "react";
import MyModel from "./MyModel";
import MyEditor from "./MyEditor";
import { useDisclosure } from "@nextui-org/modal";
import categoryService from "@/src/services/category/categoryService";
import { TCategory } from "@/src/types/comment";
import toast from "react-hot-toast";
import toastTheme from "@/src/styles/toastTheme";

const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { mutate: postMutate, isPending, data } = postService.createPost();
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("");
  const { user, isLoading } = useUser();
  const { data: allCategory } = categoryService.allCategory(
    user?._id as string
  );
  const pathname = usePathname();
  let navLink = [...siteConfig.navItems];

  if (user) {
    navLink = [
      ...navLink,
      {
        label: "Feed",
        href: "/news-feed",
      },
    ];
  }

  useEffect(() => {
    if (data?.success) {
      onOpenChange();
      setPost("");
      setCategory("");
      router.push("/news-feed");
    }
  }, [data?.success]);

  const handleLogout = async () => {
    await LogOut();
    if (privateRoute.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleLink = (link: string) => {
    router.push(link);
  };

  const handleClick = () => {
    if (!category.length) return toast.error("Select a category", { ...toastTheme });
    if (!post.length) return toast.error("enter your post", { ...toastTheme });
    postMutate({ post, category });
  };
  return (
    <NextUINavbar shouldHideOnScroll className="border-b border-sky-100">
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit text-sky-500">
          TripAdvisor
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navLink.map((item, index) => (
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
          {!isLoading && user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  name={user?.name}
                  size="sm"
                  src={user?.picture}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                {user && user?.role === userRole.user ? (
                  <DropdownItem key="createPost" onClick={onOpen}>
                    <div className="flex ">
                      <CiSquarePlus className="text-xl text-sky-700" /> New Post
                    </div>
                  </DropdownItem>
                ) : (
                  <DropdownItem className="hidden"></DropdownItem>
                )}
                <DropdownItem
                  key="settings"
                  onClick={() => handleLink("/profile")}
                >
                  My Profile
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button link="/login">Login</Button>
          )}
        </NavbarItem>
        <NavbarItem className="sm:hidden basis-1 pl-4">
          <NavbarMenuToggle />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navLink.map((item, index) => (
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
      <MyModel
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Add Post"
      >
        <Select
          placeholder="Category"
          aria-label="Category"
          className="max-w-xs"
          required={true}
          onChange={(e) => setCategory(e.target.value)}
          disableSelectorIconRotation
          selectorIcon={<HiSelector />}
        >
          {allCategory?.data?.map((item: TCategory) => (
            <SelectItem key={item?.name} className="capitalize">{item?.name}</SelectItem>
          ))}
        </Select>
        <MyEditor value={post} setValue={setPost} />
        <div className="text-center">
          <NextUiButton
            isLoading={isPending}
            onClick={handleClick}
            className="bg-sky-400 text-white"
          >
            Post
          </NextUiButton>
        </div>
      </MyModel>
    </NextUINavbar>
  );
};

export default Navbar;
