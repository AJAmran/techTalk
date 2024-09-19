import { Types } from "mongoose";

export type TPost = {
  title: string;
  content: string;
  categories: string[];
  imageUrl: string;
  author: Types.ObjectId;
};
