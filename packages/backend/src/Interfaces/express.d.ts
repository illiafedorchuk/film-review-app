import { User } from "../Users/user"; // Adjust the import path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: User; // Use your User type here
    }
  }
}
і;
