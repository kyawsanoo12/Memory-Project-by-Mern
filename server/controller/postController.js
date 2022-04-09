import mongoose from "mongoose";
import PostMessage from "../model/postModel.js";

export const getPosts =async (req, res) => {
    try {
        const posts = await PostMessage.find();
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

export const createPost = async (req, res) => {
    const { creator, title, selectedFile, tags, message } = req.body;
    
    if (!creator) {
        return res.status(400).json({ message: "Creator is required!" });
    }
     if (!title) {
        return res.status(400).json({ message: "Title is required!" });
     }
     if (!selectedFile) {
        return res.status(400).json({ message: "selectedFile is required!" });
     }
    
     if (!tags) {
        return res.status(400).json({ message: "Tags is required!" });
     }
     if (!message) {
        return res.status(400).json({ message: "Message is required!" });
     }
    
    const newPost = new PostMessage(req.body);
    try {
    
        const post=await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(409).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No Post with that id" });
    const body = req.body;
    try {
        const post = await PostMessage.findByIdAndUpdate(id, body, { new: true });
        if (post) {
            return res.status(201).json(post);
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No Post with that id" });

    try {
        await PostMessage.findByIdAndDelete(id);
        return res.status(201).json({ message: "Post have successfully deleted!" });
    } catch (err) {
        
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No Post with that id" });
    try {
         const post = await PostMessage.findById(id);
        const updatePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 });
        
        return res.json(updatePost);
    } catch (err) {
        return res.status(500).json(err);
    }
}