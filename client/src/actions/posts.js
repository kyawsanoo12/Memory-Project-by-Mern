import * as api from "../api/index";

export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPost();
        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (err) {
        console.log(err.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = api.createPost(post);
        dispatch({ type: "CREATE", payload: data});
    } catch (err) {
        console.log(err.message);
    }
}