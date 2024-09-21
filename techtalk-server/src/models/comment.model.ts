import { model, Schema } from "mongoose";
import { TComment } from "../interface/comment.interface";

const commentSchema = new Schema<TComment>(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

const Comment = model<TComment>("Comment", commentSchema);

export default Comment;
