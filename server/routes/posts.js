import express from "express";
import { createPost, deletePost, getPosts, likePost, updatePost,getPostsBySearch, postDetail } from "../controller/postController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.post('/', auth, createPost);
router.get("/:id", postDetail);
router.patch("/:id", auth,updatePost);
router.delete("/:id", auth,deletePost);
router.patch("/:id/likePost", auth,likePost);

export default router;