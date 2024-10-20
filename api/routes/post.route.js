import express from "express";
import { create, getpeqs } from "../controllers.js/post.controller.js";

const router = express.Router();

router.get("/getpeqs", getpeqs);
router.post("/create", create);

export default router;
