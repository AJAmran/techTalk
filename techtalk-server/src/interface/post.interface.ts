import { Types } from "mongoose";

export type TPost = {
  title: string;
  content: string;
  author: Types.ObjectId;
  tags: string[];
  categories: string[];
  comments: string[];
  status: 'draft' | 'published';
};
