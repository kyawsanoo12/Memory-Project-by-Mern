import mongoose from "mongoose";
import PostMessage from "../model/postModel.js";

export const getPosts = async (req, res) => {
    const { page } = req.query;
    const LIMIT = 6;
    const searchIndex = (Number(page) - 1) * LIMIT;
    try {
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find({}).sort({_id:-1}).limit(LIMIT).skip(searchIndex);
        return res.status(200).json({ data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
     const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        
        const post=await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(409).json({ message: err.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",")  }
}] });
        return res.status(200).json({ data: posts });
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const postDetail = async (req, res) => {
    const { id } = req.params;
    
    try {
        const post = await PostMessage.findById(id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
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
     
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No Post with that id" });
    try {
        const post = await PostMessage.findById(id);
         
        const index = post.likes.findIndex((id) => id === String(req.userId));
             
        if (index == -1) {
            //like to post
            post.likes.push(req.userId);
            
        } else {
            //dislike to post
            post.likes=post.likes.filter((id) => id !== String(req.userId));
        }
        
        const updatePost = await PostMessage.findByIdAndUpdate(id,post);
        //console.log(updatePost)
        return res.json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
}