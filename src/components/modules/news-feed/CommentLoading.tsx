import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";
import { IoSend } from "react-icons/io5";

const CommentLoading = () => {
    return (
        <Card className="border rounded-xl p-4 h-[calc(100vh-200px)] pb-20">
          <CardHeader className="border-b">
            <h3 className="font-bold text-xl">Comments</h3>
          </CardHeader>
          <CardBody className="overflow-y-scroll space-y-4 mt-2">
            <Skeleton className="h-6 w-1/2 rounded-md" />
            <Skeleton className="h-6 w-1/3 rounded-md" />
            <Skeleton className="h-6 w-2/3 rounded-md" />
            <Skeleton className="h-6 w-2/4 rounded-md" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-6 w-1/2 rounded-md" />
            <Skeleton className="h-6 w-1/3 rounded-md" />
            <Skeleton className="h-6 w-2/3 rounded-md" />
            <Skeleton className="h-6 w-2/4 rounded-md" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
          </CardBody>
          <CardFooter className="absolute bottom-0 left-0 right-0 w-full">
            <Input
              classNames={{
                label: "capitalize",
              }}
              placeholder="Write a comment…"
              endContent={
                <Button
                  isIconOnly
                  type="submit"
                  className="bg-transparent"
                  size="sm"
                >
                  <IoSend />
                </Button>
              }
              type="text"
              variant={"bordered"}
            />
          </CardFooter>
        </Card>
    );
};

export default CommentLoading;