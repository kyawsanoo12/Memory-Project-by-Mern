import * as api from "../api/index";
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../constants/actionTypes";

export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPost();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (err) {
        console.log(err.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } =await api.createPost(post);
        dispatch({ type:CREATE, payload: data});
    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
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