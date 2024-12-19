import Peq from "../models/post.model.js";
import { errorHandler } from "../utilities/error.js";

export const create = async (req, res, next) => {
  const courseCode = req.body.courseCode;
  const content = req.body.content;

  // if (!title || !content) {
  //   return next(errorHandler(400, "All field are required"));
  // }
  const slug = req.body.courseCode
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const userId = Math.floor(Math.random() * 1000000) + "-" + "userId";

  console.log(userId);

  const newPeq = new Peq({
    ...req.body,
    slug,
    userId,
  });
  try {
    const savedPeq = await newPeq.save();
    res.status(200).json(savedPeq);
  } catch (error) {
    next(error);
  }
};

export const getpeqs = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const peqs = await Peq.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
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
};
