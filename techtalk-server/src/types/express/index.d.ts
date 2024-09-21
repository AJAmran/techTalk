
declare namespace Express {
    export interface Request {
      user?: {
        _id: string;
        role: 'admin' | 'author' | 'reader';
        id?: string;
      };
    }
  }
  