import {Card, CardMedia, Typography ,Button, CardContent, CardActions, ButtonBase} from "@mui/material";
import React, { useState } from "react";
import useStyles from "./style";
import moment from "moment";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
    const history = useNavigate();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    const userId = user?.result?.googleId || user?.result?._id;

    const [likes, setLikes] = useState(post?.likes);
    
    const hasLikedPost = post.likes.find((id) => id === userId);

    const handleLike = () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId));
        } else {
            setLikes([...likes, userId]);
        }
    };

    const Likes = () => {
        if (likes.length > 0) {
                return hasLikedPost ? (
                    <><ThumbUpAltIcon fontSize="small"/> &nbsp; {likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} Like ${likes.length === 1 ? "" : "s"}`}
                    </>
                ) : (
                    <><ThumbUpAltIcon fontSize="small"/> &nbsp; {likes.length === 1 ? "Like" : "Likes"} </>
                )
            
        } else {
            return (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp; Like</>
            )
        }
       
    }

    const dispatch = useDispatch();
    return (
        <Card className={classes.card} raised elevation={5} sx={{ maxWidth: 250 }} >
          
            <CardMedia image={post.selectedFile} component="img"  height="160"/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(userId === post?.creator) &&
            <div className={classes.overlay2}>
                <Button sx={{ color: "white" }} size="small" variant="text" onClick={() => setCurrentId(post._id)}>
                  <MoreHorizIcon fontSize="default"/>
                </Button>
            </div>
                }
              <ButtonBase onClick={()=>history(`/posts/${post._id}`)} className={classes.cardAction} > 
            <div className={classes.details} >
                <Typography variant="body2" color="textSecondary" sx={{position:"absolute",left:"20px"}}>{post.tags.map((tag) => {
                    return tag;
                })}</Typography>
            </div>
            <div className={classes.title}>
                <Typography variant="h6">{post.title}</Typography>
            </div>
             <CardContent>
                    <Typography  variant="body2" component="p" color="textSecondary">{ post.message.substr("0","100")} ...</Typography>
                </CardContent>
                </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button  size="small" color="primary" disabled={!user} onClick={handleLike}>
                   <Likes/>
                </Button>
                {userId === post.creator &&
                    <Button color="error" size="small" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                }
            </CardActions>
       </Card>
    )
};

export default Post;