"use client";

import adminService from "@/src/services/admin/adminService";
import { TUser } from "@/src/types/userType";
import { Avatar } from "@nextui-org/avatar";
import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { HiSelector } from "react-icons/hi";
import { VscVerifiedFilled } from "react-icons/vsc";

const page = () => {
  const { data, isPending, isLoading } = adminService.getAllUser();
  const { mutate: updateUserRole, isPending: updateUserRolePending } =
    adminService.updateUserRole();

  if (isLoading || isPending || updateUserRolePending)
    return (
      <div className="flex justify-center items-center w-full min-h-screen inset-0">
        <Spinner />
      </div>
    );

  const handleChange = (id: string, role: string) => {
    updateUserRole({ id, role });
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-sky-400 mb-5">Manage User</h3>
      <Table aria-label="Following Table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>role</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No user found"}>
          {data?.data?.map((item: TUser) => (
            <TableRow key={item?._id}>
              <TableCell>
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={item?.picture}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {item?.name}{" "}
                  {item?.verified && (
                    <VscVerifiedFilled className="text-sky-400 text-lg ml-2" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div
                  className={`${
                    item?.role === "admin" ? "bg-green-500" : "bg-sky-400"
                  } inline-block px-2 rounded-full text-white font-bold`}
                >
                  {item?.role}
                </div>
              </TableCell>
              <TableCell>
                <Select
                  placeholder="Category"
                  aria-label="Category"
                  className="max-w-28"
                  required={true}
                  defaultSelectedKeys={[item?.role]}
                  onChange={(e) => handleChange(item?._id, e.target.value)}
                  disableSelectorIconRotation
                  selectorIcon={<HiSelector />}
                >
                  <SelectItem key={"admin"} className="capitalize">
                    Admin
                  </SelectItem>
                  <SelectItem key={"user"} className="capitalize">
                    User
                  </SelectItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
