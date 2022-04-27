import React from "react";
import Post from "./post/post";
import useStyles from "./style";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";

const Posts = ({ setCurrentId, currentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
   
    const classes = useStyles();
   
    if (!posts && !isLoading) {
        return console.log("No Post");
    }
    
    return (
        isLoading ? <CircularProgress sx={{margin:20}}/> : (
            <Grid container spacing={2} alignItems="stretch" direction="row" >
                {posts?.map((post) => {   
                  return(
                  <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                          <Post post={post} setCurrentId={setCurrentId}/>
                      </Grid>
                  )
              })}
            </Grid>
        )
    )
};

export default Posts;