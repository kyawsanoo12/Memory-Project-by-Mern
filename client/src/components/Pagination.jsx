import React, { useEffect } from "react";
import { PaginationItem,Pagination } from "@mui/material";
import {Link} from "react-router-dom"
import useStyles from "./style";
import { useSelector,useDispatch } from "react-redux";
import {  getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
   
    useEffect(() => {
        if (page) {     
            dispatch(getPosts(page));
        }
    },[page])

    const classes = useStyles();
    return (
        <Pagination count={numberOfPages} page={Number(page)} variant="outlined" color="primary" classes={{ ul: classes.ul }} renderItem={(item) => {
            return (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )
            }}/>
    )
};

export default Paginate;