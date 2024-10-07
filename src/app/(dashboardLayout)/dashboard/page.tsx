"use client";

import { useUser } from "@/src/utils/Provider/UserProvider";
import { userRole } from "@/src/const/user";
import AdminDashboard from "@/src/components/modules/dashboard/AdminDashboard";
import UserDashboard from "@/src/components/modules/dashboard/UserDashboard";

const page = () => {
  const { user } = useUser();
  return (
    <div>
      {user?.role === userRole?.admin ? (
        <AdminDashboard />
      ) : user?.role === userRole?.user ? (
        <UserDashboard />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default page;
