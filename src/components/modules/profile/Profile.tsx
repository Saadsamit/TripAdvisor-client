"use client";

import Image from "next/image";
import { TUser } from "@/src/types/userType";
import EditProfile from "./EditProfile";
import authService from "@/src/services/authService/authService";
import { Skeleton } from "@nextui-org/skeleton";

const Profile = () => {
  const { data, isPending, isFetching, isLoading } = authService.myProfile();

  if (isLoading || isFetching || isPending) return <ProfileLoading />

  const user: TUser = data?.data;
  return (
    <div>
    <EditProfile userData={user} />
    <div className="sm:flex sm:space-y-0 space-y-4 items-center border-b py-10">
      <div className="text-lg flex flex-col sm:text-start text-center sm:w-1/3">
        <Image
          src={user?.picture}
          alt={user?.name}
          width={300}
          height={300}
          className="sm:size-30 sm:mx-0 mx-auto rounded-full size-20"
        />
        <h3>{user?.name}</h3>
        <h4>{user?.email}</h4>
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
  </div>
  );
};

const ProfileLoading = ()=>{
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
}

export default Profile;
