import { model, Schema } from "mongoose";
import { TComment } from "../interface/comment.interface";

const commentSchema = new Schema<TComment>(
  {
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    replies: [{ type: Schema.ObjectId, ref: "Comment" }],
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Comment = model<TComment>("Comment", commentSchema);

export default Comment;
