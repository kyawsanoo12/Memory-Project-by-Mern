import axios from "axios";

const url = "https://memory-project-app.herokuapp.com/posts";

export const fetchPost = () => axios.get(url);

export const createPost = (newpost) => axios.post(url, newpost);

export const updatePost = (id, post) => axios.patch(`${url}/${id}`, post);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);