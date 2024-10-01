import { userRole } from "../const/user";

export type TcurrentUser = {
    _id: string;
    email: string;
    role: keyof typeof userRole,
    picture: string;
    name: string;
  }

export type TUser = {
  verified: boolean;
  posts: number;
  followers: number;
  following: number;
} & TcurrentUser;
