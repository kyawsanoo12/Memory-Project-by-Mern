import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Button,Typography,TextField,Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { createPost,updatePost   } from "../../actions/posts";
import { useDispatch,useSelector } from "react-redux";
import { Box } from "@mui/system";



const Form = ({currentId,setCurrentId}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const [postData, setPostData] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
         const post = posts.find((p) => p._id === currentId);
    

    useEffect(() => {
        if (currentId) {
            setPostData(post);
        }
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();

    }
    const clear = () => {
        setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
        setCurrentId(null);
    }
    const classes = useStyles();
    return (
        <Paper varient="outlined" square elevation={4}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit} style={{ padding: "20px" }}>
                <Typography variant="h6">{currentId? "Update" : "Create"} a Memory</Typography>

                <TextField id="outlined-basic" variant="outlined" sx={{margin:"10px"}} label="Creator" name="creator" value={postData.creator} onChange={(e)=>setPostData({...postData,creator:e.target.value})} fullWidth required/>
                <TextField variant="outlined"  sx={{margin:"10px"}} label="Title" name="title" value={postData.title} onChange={(e) => setPostData({ ...postData,title: e.target.value })} fullWidth required/>
                <TextField variant="outlined"  sx={{margin:"10px"}}label="Message" name="message" value={postData.message} onChange={(e) => setPostData({ ...postData,message: e.target.value })} fullWidth required/>
                <TextField variant="outlined"  sx={{margin:"10px"}} label="Tags" name="tags" value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(",") })} fullWidth required/>
                <div className={classes.fileInput}> 
                    <FileBase type="file" multiple={false} onDone={ ({base64})=>setPostData({...postData,selectedFile:base64})} />
                </div>
                <Button color="primary" variant="contained" sx={{margin:"5px"}} type="submit" size="large" fullWidth>Submit</Button>
                <Button sx={{margin:"10px"}} variant="contained" color="secondary" fullWidth size="small" onClick={clear}>Clear</Button>
           </form>
        </Paper>
    )
};

export default Form ;