import exp from "constants";

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

export interface Movie {
  id: string;
  movie_id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: string;
}

export interface Review {
  id: number;
  movieId: number;
  userId: number;
  rating: number;
  comment: string;
  criteriaRatings: {
    cast: number;
    plot: number;
    direction: number;
    cinematography: number;
    writing: number;
    themes: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
