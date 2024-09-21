export type TUser = {
  isModified(arg0: string): unknown;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'author' | 'reader';
  comparePassword(candidatePassword: string): Promise<boolean>;
};
