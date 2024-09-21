import { z } from "zod";

export const commentSchema = z.object({
  postId: z.string(),
  content: z.string().min(1, "Comment cannot be empty"),
  parentCommentId: z.string().optional(), 
});
