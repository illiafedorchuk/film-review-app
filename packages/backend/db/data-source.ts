import dotenv from "dotenv";

import { DataSource } from "typeorm";
import { User } from "../src/Users/user";
import { Movie } from "../src/Movies/movie";
import { Review } from "../src/Review/review";

dotenv.config({ path: "./config.env" });
console.log(process.env.POSTGRES_HOST);

export const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Movie, Review],
  synchronize: true,
});
