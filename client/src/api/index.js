import axios from "axios";

const Api = axios.create({ baseURL: "https://memory-project-app.herokuapp.com/" });

Api.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
          req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
  

    return req;
})

export const fetchPosts = (page) => Api.get(`/posts?page=${page}`);

export const fetchPost = (id) => Api.get(`/posts/${id}`);

export const createPost = (newpost) => Api.post("/posts", newpost);

export const updatePost = (id, post) => Api.patch(`/posts/${id}`, post);

export const deletePost = (id) => Api.delete(`/posts/${id}`);

export const likePost = (id) => Api.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => Api.post("/user/signin", formData);

export const signUp = (formData) => Api.post("/user/signup", formData);

export const fetchPostBySearch = ({ search, tags }) => Api.get(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`);