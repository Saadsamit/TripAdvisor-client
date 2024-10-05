import { TUser } from "./userType";

  export type TPost = {
    _id:string;
    post: string;
    user: TUser;
    category: string;
    comments: string | null;
    upvote: string[];
    downvote: string[];
  };