"use client";

import Button from "@/src/components/UI/Button";
import postService from "@/src/services/posts/postService";
import { TPost } from "@/src/types/post";
import comfirmAlert from "@/src/utils/comfirmAlert";
import sliceHTML from "@/src/utils/sliceHTML";
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
  const { data, isPending, isFetching, isLoading } = postService.getAllAdmin();
  const { mutate: myDeletePostAdmin, isPending: myDeletePostAdminPending } =
    postService.myDeletePostAdmin();

  if (isLoading || isFetching || isPending || myDeletePostAdminPending)
    return (
      <div className="flex justify-center items-center w-full min-h-screen inset-0">
        <Spinner />
      </div>
    );

  const handleClick = (id: string) => {
    comfirmAlert(() => myDeletePostAdmin(id));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-sky-400 mb-5">Manage Post</h3>
      <Table aria-label="Following Table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>post</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Post found"}>
          {data?.data?.map((item: TPost) => (
            <TableRow key={item?._id}>
              <TableCell>
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={item?.user?.picture}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {item?.user?.name}{" "}
                  {item?.user?.verified && (
                    <VscVerifiedFilled className="text-sky-400 text-lg ml-2" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sliceHTML(item?.post, 50),
                  }}
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleClick(item?._id)}
                  className="bg-red-400"
                  size="sm"
                >
                  Delete
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
