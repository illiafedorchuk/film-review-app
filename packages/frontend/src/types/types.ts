export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  overview: string;
  backdrop_path?: string;
}

export interface ApiResponse<T> {
  results: T[];
  page: number;
  total_results: number;
  total_pages: number;
}

export interface Actor {
  id: number;
  name: string;
  pro: string;
  profile_path: string;
  character: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface MovieDetails {
  id: number;
  original_language: string;
  genres: Array<{
    name: string;
  }>;
  tagline: React.ReactNode;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
  runtime?: number;
}

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  isAdmin?: boolean;
  createdAt: Date;
  watchLaterMovies?: number[];
  bookmarkedMovies: number[];
  aboutMe?: string;
  country?: string;
}
