"use client";

import { useUser } from "@/src/utils/Provider/UserProvider";
import { userRole } from "@/src/const/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLinks, userLinks } from "./dashboardRoutes";

const DashboardLayout = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const DashboardLink =
    user?.role === userRole?.admin
      ? adminLinks
      : user?.role === userRole?.user
      ? userLinks
      : [];
  return (
    <div className="border-r border-sky-200 md:w-64 bg-sky-200 rounded-r-xl sm:w-52 w-36 fixed top-0 bottom-0 p-4 left-0 overflow-x-hidden overflow-y-auto">
      <Link
        href="/"
        className="font-bold text-center sm:text-2xl text-sky-500 block mb-10"
      >
        TripAdvisor
      </Link>
      <div className="space-y-4">
        {DashboardLink.map((item, index) => (
          <Link
            className={`${
              pathname === item.href
                ? "bg-sky-400 text-white border-none"
                : " hover:bg-sky-300 hover:border-none hover:text-white"
            } px-2 py-1 rounded-lg block text-center border border-sky-300 capitalize`}
            href={item.href}
            key={`${item}-${index}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
