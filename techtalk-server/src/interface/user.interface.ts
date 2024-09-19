export type TUser = {
  username: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "user";
};
