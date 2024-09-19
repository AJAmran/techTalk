import { Types } from "mongoose";

export type TComment = {
  content: string;
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  replies: TComment[];
  isApproved: boolean;
};
