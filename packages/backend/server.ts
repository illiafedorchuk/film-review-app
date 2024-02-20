import express from "express";
import app from "./App";
import { AppDataSource } from "./db/data-source";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
console.log(process.env.POSTGRES_HOST);

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
