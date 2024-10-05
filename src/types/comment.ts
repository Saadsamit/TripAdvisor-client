export type TComment = {
  _id: string;
  user: {
    _id: string;
    name: string;
    picture: string;
    verified: boolean;
  };
  comment: string;
};

export type TCategory = {
  _id: string;
  name: string;
};

export type TComments = {
  _id: string;
  postUser: string;
  postId: string;
  comments: TComment[];
};
