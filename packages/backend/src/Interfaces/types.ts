export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface iNewUser {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
