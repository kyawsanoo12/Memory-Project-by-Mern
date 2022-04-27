import * as api from "../api/index";
import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, LIKE, START_LOADING, UPDATE, FETCH_POST } from "../constants/actionTypes";
import { useNavigate } from "react-router-dom";

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
       
        const { data } = await api.fetchPost(id);
      
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        
        const { data } = await api.fetchPosts(page);
      
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data:{data}}= await api.fetchPostBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
}

export const createPost = (post,history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        history(`/posts/${data._id}`);
        dispatch({ type: CREATE, payload: data });
        
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
     }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
       // console.log(data)
        dispatch({ type: LIKE, payload: data });
    } catch (err) {
        console.log(err);
    }
}