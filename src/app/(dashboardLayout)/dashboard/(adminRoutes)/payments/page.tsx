"use client";

import paymentService from "@/src/services/payment/paymentService";
import { TPayment } from "@/src/types";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

const page = () => {
  const { data, isPending, isFetching, isLoading } =
    paymentService.allPayment();

  if (isLoading || isFetching || isPending)
    return (
      <div className="flex justify-center items-center w-full min-h-screen inset-0">
        <Spinner />
      </div>
    );
  return (
    <div>
      <h3 className="text-2xl font-bold text-sky-400 mb-5">Payment</h3>
      <Table aria-label="Following Table">
        <TableHeader>
          <TableColumn>Transaction Id</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Payment found"}>
          {data?.data?.map((item: TPayment) => (
            <TableRow key={item?._id}>
              <TableCell>{item?.tranId}</TableCell>
              <TableCell>{item?.price}tk</TableCell>
              <TableCell>{item?.user?.name}</TableCell>
              <TableCell
                className={`${
                  item?.status === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item?.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
