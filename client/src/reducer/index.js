import posts from "./posts";
import { combineReducers } from "redux";
import auth from "./auth"
export default combineReducers({
    posts,
    auth
})