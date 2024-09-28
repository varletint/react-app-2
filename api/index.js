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

// app.use(
//   cors({
//     origin: "https://react-app-2-tau.vercel.app/",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

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
app.listen("https://backekend.vercel.app/", () => {
  console.log("The server is running at port 3030");
});

app.use("/api/post", postRoutes);
