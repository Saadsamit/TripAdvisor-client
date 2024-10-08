import { TPost } from "@/src/types/post";
import sliceHTML from "@/src/utils/sliceHTML";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";

const ProfilePostCard = ({ data }: { data: TPost }) => {
  return (
    <Link href={`/news-feed/${data?._id}`}>
      <Card>
        <CardBody className="p-3 overflow-visible text-small">
        {data?.category && (
        <p className="text-sky-400 text-small">
          #
          <Link
            href={`/news-feed?category=${data?.category}`}
            className="hover:underline"
          >
            {data?.category}
          </Link>
        </p>
      )}
          <div dangerouslySetInnerHTML={{ __html: sliceHTML(data?.post, 100) }} />
        </CardBody>
        <CardFooter className="gap-3 flex-wrap">
          <div className="flex gap-1">
            <p className="font-semibold text-small">{data?.upvote?.length}</p>
            <p className=" text-small">Upvote</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-small">{data?.downvote?.length}</p>
            <p className=" text-small">Downvote</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProfilePostCard;