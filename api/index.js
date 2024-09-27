// Dependencies Importation

import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Importing local Routes
import postRoutes from "./routes/post.route.js";

// setting app = express
const app = express();

app.use(express.json());

// configuring Dotenv

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

// Connecting to the Database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

//   Server connection
app.listen(3030, () => {
  console.log("The server is running at port 3030");
});

app.use("/api/post", postRoutes);
