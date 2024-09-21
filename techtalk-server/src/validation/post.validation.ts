import { z } from "zod";

// Validation with Zod
export const postSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
});
