import React, { useEffect } from "react";
import { Paper,Card,CardMedia,CardContent,Typography ,Box, CircularProgress, Divider} from "@mui/material";
import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPostsBySearch } from "../../actions/posts";
import Comments from "./commentSection";

const PostDetail = () => {
     const dispatch = useDispatch();
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const { id } = useParams();
    
    const history = useNavigate();
    
    useEffect(() => {   
            dispatch(getPost(id));   
    }, [id]);
   
    useEffect(() => {
        if (post) {
             dispatch(getPostsBySearch({ search: "none", tags: post?.tags }));
        }
       
    },[post])
    const classes = useStyles(); 
  
    if (!post) {
        return null;
    }
   
   if (isLoading) {
        return (
            <Paper className={classes.loadingPaper}>
                <CircularProgress size="5rem"/>
            </Paper>
        )
   }
   
    const recommendedPosts =posts.length > 0 ? posts?.filter(({_id}) => _id !== post?._id):null;
    
    
 return(
            <Paper elevation={6} >
         <Card className={classes.card} >
             <div className={classes.postSection}>
                    <div className={classes.textcol}>
                        <Typography variant="h5" className={classes.title}>{post.title}</Typography>
                        <Box display="flex" flexDirection="row" sx={{margin:"10px"}}>
                            <Typography variant="body2" color="textSecondary">Created At - 24mins</Typography>
                            <Typography variant="body2" sx={{ marginLeft: "20px" }}
                                color="textSecondary"> Created by - {post.name}</Typography>
                        </Box>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="subtitle1">{post.message}</Typography>
                 </CardContent>
               
                
                 <Divider sx={{ margin: "10px" }} />
                 <Typography variant="body2" sx={{ margin: "10px" }}>Real Chat- Comming Soon</Typography>
                     <Divider sx={{ margin: "10px" }} />
                     <Comments post={post} />
                     <Divider sx={{ margin: "20px" }}/>
                 
             </div>
               < div className={classes.mediaCol}>
                 <CardMedia className={classes.imageSection} sx={{ maxHeight: "400px", borderRadius: "10px" }} component="img" image={post.selectedFile} />
                  </div>
             </div>
             <Typography variant="h5" sx={{margin:"10px"}}>You may also like :</Typography>
             <div className={classes.recommendedPosts}>
                  
                    
                     
                 {recommendedPosts?.map((post) => {
                     return (
                         <div style={{ margin: "20px", cursor: "pointer" }} className={classes.recommendedPost} onClick={()=>history(`/posts/${post._id}`)} key={post._id}>
                             <Typography variant="h6">{post.title}</Typography>
                             <Typography variant="body2" color="textSecondary">{post.tags}</Typography>
                             <Typography variant="body2">{post.message.substr(0, 200)} ... <Typography variant="body2" color="textSecondary">See More</Typography></Typography>
                             <img src={post.selectedFile} height="200px" width="300px" style={{ marginTop: "10px" }} />
                             <Typography variant="body2">{post.likes.length} { post.likes.length < 2 ? "Like": "Likes"}</Typography>
                         </div>
                     )
                 })}
           </div>
         </Card>
         
            </Paper>
  
       
        )
    
 
    
    
}

export default PostDetail;