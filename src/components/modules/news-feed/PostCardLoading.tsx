import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const PostCardLoading = () => {
    return (
        <Card className="h-fit">
        <CardHeader className="justify-between items-center">
          <div className="flex gap-5">
            <Skeleton className="rounded-full size-10" />
            <Skeleton className="h-4 w-28 mt-4 rounded-md" />
          </div>
          <Skeleton className="h-8 w-16 mt-4 rounded-md" />
        </CardHeader>
        <CardBody className="p-3 overflow-visible text-small">
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-full mt-2 rounded-md" />
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <Skeleton className="h-8 w-16 rounded-xl" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-8 w-16 rounded-xl" />
          </div>
        </CardFooter>
      </Card>
    );
};

export default PostCardLoading;