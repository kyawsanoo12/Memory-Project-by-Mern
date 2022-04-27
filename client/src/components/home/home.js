import React,{ useState} from "react";

import Posts from "../posts/posts";
import Form from "../form/form";
import { Grow, Grid, Paper, AppBar,TextField, Button, Autocomplete ,Chip} from "@mui/material";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import Paginate from "../Pagination";
import useStyles from "./style";

import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    function Query() {
        return new URLSearchParams(useLocation().search);
    }

    const query = Query();
    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");

    const [tags, setTag] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`);
        } else {
            navigate("/")
        }
    }
    
    const handleKeyPress = (e) => {

        if (e.charCode === 13) {
           searchPost()
        }
    }

    return (
        <Grow in >
           
                <Grid container spacing={2} justifyContent="space-between"  >
                    <Grid item xs={12} sm={7} md={7}>
                        <Posts currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={3.2} md={3.2} >
                        <AppBar position="static" color="inherit" className={classes.appBar}>
                            <Paper elevation={2} className={classes.paper}>
                                <TextField label="Searh Memories" sx={{ marginBottom: "10px" }} name="search" onChange={(e) => setSearch(e.target.value)} fullWidth value={search} onKeyPress={handleKeyPress} />
                                <Autocomplete
                                    multiple
                                    freeSolo

                                    options={tags}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => {   
                                            setTag(value)
                                            return (
                                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                            )
                                        })
                                    }
                                
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Search Tags"
                                            
                                        />
                                    )}
                                />
                                <Button fullWidth variant="contained" sx={{ marginTop: "10px" }} color="primary" onClick={searchPost}>Search</Button>
                            </Paper>
                        </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    {(!searchQuery && tags) && (
                        <Paper elevation={4} sx={{ padding: "10px" }}>
                        <Paginate page={page}/>
                        </Paper>
                        )}
                    </Grid>
                </Grid>
            
        </Grow>
    );
};

export default Home;