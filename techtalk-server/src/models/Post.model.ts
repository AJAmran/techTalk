import { model, Schema } from "mongoose";
import { TPost } from "../interface/post.interface";

const postSchema = new Schema<TPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String }],
    categories: [{ type: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  {
    timestamps: true,
  }
);

const Post = model<TPost>("Post", postSchema);

export default Post;
