// src/constants.ts
export const API_KEY: string = "25827bdb07a5e10047fca31922e36d9e";
export const BASE_URL: string = "https://api.themoviedb.org/3";
export const TOTAL_PAGES: number = 500;
export const PLACEHOLDER_URL: string = "https://via.placeholder.com/150";

export const GENRE_MAP: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const GENRE_BUTTONS: { id: number; name: string }[] = [
  { id: 0, name: "🍿All" },
  { id: 35, name: "😂Comedy" },
  { id: 18, name: "😨Drama" },
  { id: 27, name: "👻Horror" },
  { id: 14, name: "🧐Fantasy" },
  { id: 28, name: "😎Action" },
];
