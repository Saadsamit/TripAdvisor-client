import authService from "@/src/services/authService/authService";
import paymentService from "@/src/services/payment/paymentService";
import { TPayment } from "@/src/types";
import { Skeleton } from "@nextui-org/skeleton";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";

const UserDashboard = () => {
  const { data, isPending, isLoading } = authService.myProfile();
  const {
    data: myPayment,
    isLoading: myPaymentLoading,
    isPending: myPaymentPending,
  } = paymentService.myPayment();
  if (isLoading || isPending || myPaymentLoading || myPaymentPending)
    return <ProfileLoading />;
  console.log(myPayment);
  return (
    <div>
        <div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="text-center border border-sky-400 rounded-xl py-10">
          <h3 className="font-bold">{data?.data?.followers?.length}</h3>
          <h3 className="text-sky-400 font-bold text-lg">followers</h3>
        </div>
        <div className="text-center border border-sky-400 rounded-xl py-10">
          <h3 className="font-bold">{data?.data?.following?.length}</h3>
          <h3 className="text-sky-400 font-bold text-lg">following</h3>
        </div>
        <div className="text-center border border-sky-400 rounded-xl py-10">
          <h3 className="font-bold">{data?.data?.posts}</h3>
          <h3 className="text-sky-400 font-bold text-lg">posts</h3>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="border border-sky-400 rounded-xl p-4">
          <h3 className="text-center text-sky-400 font-bold text-lg mb-4">
            User Info
          </h3>
          <div>
            <div className="text-lg flex flex-col text-center">
              <Image
                src={
                  data?.data?.picture.startsWith("http")
                    ? data?.data?.picture
                    : ""
                }
                alt={data?.data?.name}
                width={300}
                height={300}
                className="sm:size-30 mx-auto rounded-full size-20"
              />
              <h3 className="flex flex-wrap justify-center items-center">
                {data?.data?.name}{" "}
                {data?.data?.verified && (
                  <VscVerifiedFilled className="text-sky-400 text-lg ml-2" />
                )}
              </h3>
              <h4>{data?.data?.email}</h4>
            </div>
          </div>
        </div>
        <div className="border border-sky-400 rounded-xl p-4">
          <h3 className="text-center text-sky-400 font-bold text-lg mb-4">
            payment history
          </h3>
          <div>
            {myPayment?.data?.map((item: TPayment) => (
              <div className="bg-sky-50 rounded-xl py-4 px-2">
                <h3 className="capitalize font-bold"><span className="text-sky-400">tranId:</span> {item?.tranId}</h3>
                <h3 className="capitalize font-bold"><span className="text-sky-400">Price:</span> {item?.price}tk</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const ProfileLoading = () => {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[...Array(3)].map(() => (
          <div className="flex flex-col items-center border border-sky-400 rounded-xl py-10">
            <Skeleton className="h-6 w-6 mt-4 rounded-md sm:mx-0 mx-auto" />
            <Skeleton className="h-6 w-28 mt-4 rounded-md sm:mx-0 mx-auto" />
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="border border-sky-400 rounded-xl p-4">
          <h3 className="text-center text-sky-400 font-bold text-lg mb-4">
            User Info
          </h3>
          <div>
            <Skeleton className="sm:size-30 mx-auto rounded-full size-20" />
            <Skeleton className="h-6 w-28 mt-4 rounded-md mx-auto" />
            <Skeleton className="h-6 w-36 mt-4 rounded-md mx-auto" />
          </div>
        </div>
        <div className="border border-sky-400 rounded-xl p-4">
          <h3 className="text-center text-sky-400 font-bold text-lg mb-4">
            payment history
          </h3>
          <div>
            <Skeleton className="h-6 w-full mb-4 rounded-md" />
            <Skeleton className="h-6 w-full mb-4 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
