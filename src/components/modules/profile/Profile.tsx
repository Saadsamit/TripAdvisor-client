"use client";

import Image from "next/image";
import { TUser } from "@/src/types/userType";
import EditProfile from "./EditProfile";
import authService from "@/src/services/authService/authService";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Skeleton } from "@nextui-org/skeleton";
import { useUser } from "@/src/utils/Provider/UserProvider";
import { Button } from "@nextui-org/button";
import postService from "@/src/services/posts/postService";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { paymentApi } from "@/src/services/payment/paymentApi";

const Profile = ({ id }: { id?: string }) => {
  const { user: userData } = useUser();
  const { data, refetch, isPending, isFetching, isLoading } = id
    ? authService.getAUser(id)
    : authService.myProfile();
  const {
    mutate: followUserMutate,
    isPending: followUserPending,
    data: followData,
  } = postService.followUser();

  useEffect(() => {
    if (followData?.success) {
      refetch();
    }
  }, [followData?.success]);

  if (isLoading || isFetching || isPending) return <ProfileLoading />;

  const Follow = data?.data?.followers?.includes(userData?._id as string);

  const handleCilck = () => {
    Swal.fire({
      title: "Are you sure you want to verified?",
      text: "You need to pay 200tk to verified",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton: "swal-cancel-btn",
        cancelButton: "swal-confirm-btn",
      },
      buttonsStyling: false,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        paymentApi()
      }
    });
  };

  const user: TUser = data?.data;
  return (
    <div className="border-b pb-5">
      {id ? "" : <EditProfile userData={user} />}
      <div className="sm:flex sm:space-y-0 space-y-4 items-center py-10">
        <div className="text-lg flex flex-col sm:text-start text-center sm:w-1/3">
          <Image
            src={user?.picture.startsWith("http") ? user?.picture : ""}
            alt={user?.name}
            width={300}
            height={300}
            className="sm:size-30 sm:mx-0 mx-auto rounded-full size-20"
          />
          <h3 className="flex flex-wrap sm:justify-start justify-center items-center">
            {user?.name}{" "}
            {user?.verified && (
              <VscVerifiedFilled className="text-sky-400 text-lg ml-2" />
            )}
          </h3>
          <h4>{user?.email}</h4>
          {userData?._id !== data?.data?._id && (
            <div>
              <Button
                className={`${
                  Follow
                    ? "bg-transparent text-foreground border border-sky-400"
                    : "bg-sky-400 text-white"
                } mt-5`}
                size="sm"
                isLoading={followUserPending}
                onClick={() => followUserMutate(data?.data?._id)}
              >
                {Follow ? "Unfollow" : "Follow"}
              </Button>
            </div>
          )}
        </div>
        <div className="sm:text-xl text-lg text-center flex justify-between font-bold capitalize sm:w-2/3">
          <div>
            <h3>{user?.followers?.length}</h3>
            <h3>followers</h3>
          </div>
          <div>
            <h3>{user?.following?.length}</h3>
            <h3>following</h3>
          </div>
          <div>
            <h3>{user?.posts}</h3>
            <h3>posts</h3>
          </div>
        </div>
      </div>
      {!user?.verified && !id && !!data?.upvoteData?.upvote?.length && (
        <div className="text-white bg-sky-400 rounded-3xl capitalize flex flex-wrap gap-4 sm:justify-between justify-center items-center px-10 py-3">
          <h5 className="sm:text-start text-center">
            You Fullfill the condition for verified user
          </h5>
          <Button
            onClick={handleCilck}
            className={"bg-white text-sky-400"}
            size="md"
          >
            Verified Now
          </Button>
        </div>
      )}
    </div>
  );
};

const ProfileLoading = () => {
  return (
    <div>
      <Skeleton className="size-6 rounded-md ml-auto mt-2" />
      <div className="sm:flex sm:space-y-0 space-y-4 items-center border-b py-10">
        <div className="text-lg flex flex-col sm:text-start text-center sm:w-1/3">
          <Skeleton className="sm:size-30 sm:mx-0 mx-auto rounded-full size-20" />
          <Skeleton className="h-6 w-28 mt-4 rounded-md sm:mx-0 mx-auto" />
          <Skeleton className="h-6 w-36 mt-4 rounded-md sm:mx-0 mx-auto" />
        </div>
        <div className="sm:text-xl text-lg text-center flex justify-between font-bold capitalize sm:w-2/3">
          <div>
            <Skeleton className="size-6 rounded-md mx-auto" />
            <Skeleton className="h-6 w-20 mt-4 rounded-md" />
          </div>
          <div>
            <Skeleton className="size-6 rounded-md mx-auto" />
            <Skeleton className="h-6 w-20 mt-4 rounded-md" />
          </div>
          <div>
            <Skeleton className="size-6 rounded-md mx-auto" />
            <Skeleton className="h-6 w-20 mt-4 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
