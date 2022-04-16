import React,{useEffect, useState} from "react";

import Posts from "../posts/posts";
import Form from "../form/form";
import { Grow, Container, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";


const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    
    return (
        <Grow in >
            <Container >
                <Grid container spacing={2} justifyContent="space-between" >
                    <Grid item xs={12} sm={7}>
                        <Posts currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
};

export default Home;