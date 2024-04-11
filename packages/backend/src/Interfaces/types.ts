export interface User {
  id: string;
  name: string;
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

export interface iCustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  code?: number;
  path?: string; // Add this line
  value?: any; // Add this line, consider using a more specific type if possible
  errors?: any;
  reason?: any;
  el?: any;
}

export interface ExtendedRequest extends Request {
  user?: User;
  cookies: { [key: string]: string };
}
