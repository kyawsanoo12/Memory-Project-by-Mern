import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Button,Typography,TextField,Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { createPost,updatePost   } from "../../actions/posts";
import { useDispatch,useSelector } from "react-redux";
import { Box } from "@mui/system";



const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const [postData, setPostData] = useState({  title: "", message: "", tags: "", selectedFile: "" });
         const post = posts.find((p) => p._id === currentId);
    

    useEffect(() => {
        if (currentId) {
            setPostData(post);
        }
    },[post])
    
      const user = JSON.parse(localStorage.getItem("profile"));

    const handleSubmit = (e) => {
      
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, {...postData,name:user?.result?.name}));
        } else {
            dispatch(createPost({...postData,name:user?.result?.name}));
        }
        clear();

    }
    const clear = () => {
        setPostData({ title: "", message: "", tags: "", selectedFile: "" });
        setCurrentId(null);
    }
    
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" alignItems="center">
                    Please Sign In to create your own memories and other's like memories</Typography>
            </Paper>
        )
    }


    return (
        <Paper varient="outlined" square elevation={4}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit} style={{ padding: "20px" }}>
                <Typography variant="h6">{currentId? "Update" : "Create"} a Memory</Typography>

                
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