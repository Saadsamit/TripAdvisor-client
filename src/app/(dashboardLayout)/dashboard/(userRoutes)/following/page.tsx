"use client";

import Button from "@/src/components/UI/Button";
import authService from "@/src/services/authService/authService";
import { TUser } from "@/src/types/userType";
import { Avatar } from "@nextui-org/avatar";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { VscVerifiedFilled } from "react-icons/vsc";

const page = () => {
  const { data, isPending, isFetching, isLoading } = authService.myFollowing();

  if (isLoading || isFetching || isPending)
    return (
      <div className="flex justify-center items-center w-full min-h-screen inset-0">
        <Spinner />
      </div>
    );

  return (
    <div>
      <h3 className="text-2xl font-bold text-sky-400 mb-5">following</h3>
      <Table aria-label="Following Table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Following user found"}>
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
              <TableCell>{item?.email}</TableCell>
              <TableCell>
                <Button link={`/profile/${item?._id}`} size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
