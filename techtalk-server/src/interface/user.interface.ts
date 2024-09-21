export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'author' | 'reader';
  comparePassword(candidatePassword: string): Promise<boolean>;
};
