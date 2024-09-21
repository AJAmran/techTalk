import { model, Schema } from "mongoose";
import { TUser } from "../interface/user.interface";
import bcrypt from 'bcryptjs';

const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "author", "reader"],
      default: "reader",
    },
  },
  {
    timestamps: true,
  }
);


// Password hashing before save
userSchema.pre<TUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// Compare passwords for login
userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<TUser>("User", userSchema);

export default User;
