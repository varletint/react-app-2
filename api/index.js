// Dependencies Importation

import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Peq from "./models/post.model.js";
import { errorHandler } from "./utilities/error.js";

import path from "path";

// Importing local Routes
import postRoutes from "./routes/post.route.js";
import authRoutes from "./routes/auth.route.js";

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
app.get("/api/get", async (req, res, next) => {
  // res.send("Hello World!");

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const peqs = await Peq.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.department && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { courseTitle: { $regex: req.query.searchTerm, $options: "i" } },
          { courseCode: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPeqs = await Peq.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPeqs = await Peq.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      peqs,
      totalPeqs,
      lastMonthPeqs,
    });
  } catch (error) {
    next(error);
  }
});
//   Server connection
app.listen(3030, () => {
  console.log("The server is running at port 3030");
});

// Routes
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Post Route

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
