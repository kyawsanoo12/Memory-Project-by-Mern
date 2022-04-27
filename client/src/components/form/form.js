import React, { useEffect, useState } from "react";
import useStyles from "./style";
import { Button,Typography,TextField,Paper, Alert } from "@mui/material";
import FileBase from "react-file-base64";
import { createPost,updatePost   } from "../../actions/posts";
import { useDispatch,useSelector } from "react-redux";
import { Box, maxWidth } from "@mui/system";
import { useNavigate } from "react-router-dom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {posts} = useSelector((state) => state.posts);
    const [error, setError] = useState(null);
    const history = useNavigate();
    const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: "" });
    
     const post = posts.length > 0 ? posts?.find((p) => p._id === currentId):null;
    useEffect(() => {
        if (currentId) {  
            setPostData(post);
        }
    },[post])
    
      const user = JSON.parse(localStorage.getItem("profile"));

    const handleSubmit = (e) => {
      
        e.preventDefault();
        if ((postData.title && postData.message && postData.selectedFile && postData.tags) === "") {
            return setError("Please fill in all the fields");
        }
        if (currentId) {
            dispatch(updatePost(currentId, {...postData,name:user?.result?.name}));
        } else {
            dispatch(createPost({...postData,name:user?.result?.name},history));
        }
        clear();

    }
    if (error) {
        setTimeout(() => {
            setError("");
        }, 5000);
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
                <Typography variant="h6">{currentId ? "Update" : "Create"} a Memory</Typography>
                {error && (
                    <Alert severity="error" sx={{margin:"10px"}}>{error}</Alert>
                )}
                <TextField variant="outlined"  sx={{margin:"10px"}} label="Title" name="title" value={postData.title} onChange={(e) => setPostData({ ...postData,title: e.target.value })} fullWidth required/>
                <TextField variant="outlined"  sx={{margin:"10px"}}label="Message" name="message" value={postData.message} onChange={(e) => setPostData({ ...postData,message: e.target.value })} fullWidth required/>
                <TextField variant="outlined" sx={{ margin: "10px" }} label="Tags" name="tags" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })} fullWidth required />
                {postData.selectedFile &&
                    <img style={{maxWidth:"300px"}} src={postData.selectedFile} />
                }

                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} style={{display:"none"}}/>
               
                <Button color="primary" variant="contained" sx={{margin:"5px"}} type="submit" size="large" fullWidth>Submit</Button>
                <Button sx={{margin:"10px"}} variant="contained" color="secondary" fullWidth size="small" onClick={clear}type="button">Clear</Button>
           </form>
        </Paper>
    )
};

export default Form ;