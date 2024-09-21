import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import commentRoutes from "./routes/comment.routes";
import rateLimit from "express-rate-limit";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// // Define allowed origins
// const allowedOrigins = ['http://example.com', 'http://anotherdomain.com'];

// // CORS options with explicit types
// const corsOptions: CorsOptions = {
//   origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
//     if (allowedOrigins.indexOf(origin || '') !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// Apply CORS middleware with options
app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Use routes in the app
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Not found middleware
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Base route
app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>Welcome to the Tech Talk server</h1>`);
});

export default app;
