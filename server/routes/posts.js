import express from "express";
import { createPost, getPosts } from "../controller/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post('/', createPost);

export default router;