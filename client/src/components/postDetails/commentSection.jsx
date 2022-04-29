import { TextField, Typography,Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import { commentPost } from "../../actions/posts";


const Comments = ({post}) => {
    const classes = useStyles();
   
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
   
    const dispatch = useDispatch();  
    const user = JSON.parse(localStorage.getItem("profile"));

    const handleClick = () => {
        const value = `${user.result.name} : ${comment}`;
        dispatch(commentPost(value, post._id));
        
        setComments([...comments, value]);
        setComment("");   
        
    }

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer} >
                <Typography variant="h6" gutterBottom>Comments</Typography>
               
                {comments.map((c, i) => {
                    return (
                        <Typography key={i} sx={{ margin: "10px" }}><strong>{c.split(":")[0]}</strong> {c.split(":")[1]}</Typography>
                        
                    )
                })} 
               
            </div>
             
            {user?.result?.name &&
            <div style={{marginTop:"10px",width:"70%"}}>
                <Typography variant="h6" gutterBottom>Write a Comment</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    rows={4}
                    
                    multiline
                    label="Comment"
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                />
                <Button variant="contained" fullWidth disabled={!comment} sx={{marginTop:"10px"}} onClick={handleClick}>Comment</Button>
                </div>
             }
        </div>
       
    )
};

export default Comments;