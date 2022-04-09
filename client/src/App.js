import React, { useEffect, useState } from "react";
import { Container, AppBar, Grid ,Typography,Grow, createTheme} from "@mui/material";
import memories from "./images/memories.png";
import Posts from "./components/posts/posts";
import Form from "./components/form/form";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";


const App = () => {
    
    const [currentId, setCurrentId] = useState(null);
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
                    <Grid container spacing={2} justifyContent="space-between" className={classes.mainContainer}>
                    <Grid item xs={12} sm={7}>
                            <Posts currentId={currentId} setCurrentId={ setCurrentId}/>
                    </Grid>
                   <Grid item xs={12} sm={4} >
                            <Form currentId={currentId} setCurrentId={ setCurrentId}/>
                    </Grid>
                    </Grid>
                </Container>
            </Grow>
      </Container>
    )
};

export default App;