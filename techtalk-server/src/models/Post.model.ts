import { model, Schema } from "mongoose";
import { TPost } from "../interface/post.interface";

const postSchema = new Schema<TPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    categories: [{ type: String, required: true }],
    imageUrl: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Post = model<TPost>("Post", postSchema);

export default Post;
