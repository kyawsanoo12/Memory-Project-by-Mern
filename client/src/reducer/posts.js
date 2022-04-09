import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../constants/actionTypes";

export default (posts = [], action) => {
    switch (action.type) {
        case DELETE:
            return posts.filter((p) => p._id !== action.payload);
        case UPDATE:
            case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case CREATE:
            return [...posts,action.payload];
        case FETCH_ALL:
            return action.payload;
        
    default:
        return posts;
    }

}