// Dependencies Importation

import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import path from "path";

// Importing local Routes
import postRoutes from "./routes/post.route.js";

// setting app = express
const app = express();

app.use(express.json());

// configuring Dotenv

dotenv.config();

// app.use(
//   cors({
//     origin: "https://vltmedia.onrender.com",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

app.use(cors());

// Your API routes go here...

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

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Post Route

app.use("/api/post", postRoutes);

// Middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
