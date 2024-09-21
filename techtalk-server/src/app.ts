import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

//not found middleware
app.use(notFound);

//global error handler
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>Welcome Tech Talk server </h2>`);
});

export default app;
