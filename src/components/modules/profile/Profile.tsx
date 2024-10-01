import axiosInstance from "@/src/libs/axios";
import Image from "next/image";
import { TUser } from "@/src/types/userType";
import EditProfile from "./EditProfile";

const Profile = async () => {
  const { data } = await axiosInstance.get("/user/my-profile");
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
        <h3>{user?.followers}</h3>
        <h3>followers</h3>
      </div>
      <div>
        <h3>{user?.following}</h3>
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

export default Profile;
