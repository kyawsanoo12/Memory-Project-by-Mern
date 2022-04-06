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
    const body = req.body;
   
    const newPost = new PostMessage(body);
    try {
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (err) {
        return res.status(409).json({ message: err.message });
    }
}
