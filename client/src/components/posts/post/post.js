import {Card, CardMedia, Typography ,Button, CardContent, CardActions} from "@mui/material";
import React from "react";
import useStyles from "./style";
import moment from "moment";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({post,setCurrentId}) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));
    const Likes = () => {
        if (post.likes.length > 0) {
                return post.likes.find((id) => id === (user?.result?.googleId || user?.result?._id)) ? (
                    <><ThumbUpAltIcon fontSize="small"/> &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} Like ${post.likes.length === 1 ? "" : "s"}`}
                    </>
                ) : (
                    <><ThumbUpAltIcon fontSize="small"/> &nbsp; {post.likes.length === 1 ? "Like" : "Likes"} </>
                )
            
        } else {
            return (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp; Like</>
            )
        }
       
    }

    const dispatch = useDispatch();
    return (
        <Card className={classes.card}>
            <CardMedia image={post.selectedFile} component="img"  />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?._id === post?.creator || user?.result?.googleId == post?.creator) &&
            <div className={classes.overlay2}>
                <Button sx={{ color: "white" }} size="small" variant="text" onClick={() => setCurrentId(post._id)}>
                  <MoreHorizIcon fontSize="default"/>
                </Button>
            </div>
                }
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => {
                    return tag;
                })}</Typography>
            </div>
            <div className={classes.title}>
                <Typography variant="h5">{post.title}</Typography>
            </div>
             <CardContent>
                    <Typography  variant="body2" component="p" color="textSecondary">{ post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button  size="small" color="primary" disabled={!user} onClick={()=>dispatch(likePost(post._id))}>
                   <Likes/>
                </Button>
                {(user?.result?._id === post.creator || user?.result?.googleId === post.creator) &&
                    <Button color="primary" size="small" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                }
            </CardActions>
       </Card>
    )
};

export default Post;