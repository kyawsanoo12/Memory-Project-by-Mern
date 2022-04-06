import React, { useEffect } from "react";
import { Container, AppBar, Grid ,Typography,Grow} from "@mui/material";
import memories from "./images/memories.png";
import Posts from "./components/posts/posts";
import Form from "./components/form/form";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    const classes = useStyles();
    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>
                
            </AppBar>
            <Grow in >
                <Container >
                    <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} sm={7}>
                        <Posts/>
                    </Grid>
                   <Grid item xs={12} sm={4}>
                        <Form/>
                    </Grid>
                    </Grid>
                </Container>
            </Grow>
      </Container>
    )
};

export default App;