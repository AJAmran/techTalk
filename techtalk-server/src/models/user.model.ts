import { model, Schema } from "mongoose";
import { TUser } from "../interface/user.interface";

const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "ediotr", "user"], default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = model<TUser>("User", userSchema);

export default User;
