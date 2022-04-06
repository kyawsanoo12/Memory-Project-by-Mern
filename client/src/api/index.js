import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPost = () => axios.get(url);

export const createPost = (newpost) => axios.post(url, newpost);