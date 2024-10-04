import { TUser } from "./userType";

  export type TPost = {
    _id:string;
    post: string;
    user: TUser;
    upvote: string[];
    downvote: string[];
  };