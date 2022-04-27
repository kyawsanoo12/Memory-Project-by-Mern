import React,{useEffect, useState} from "react";
import { AppBar,Avatar,Toolbar,Typography,Button ,Box} from "@mui/material";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import memoryLogo from "../../images/memories-Logo.png";

const NavBar = () => {
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const history = useNavigate();
    
    const dispatch = useDispatch();
    useEffect(() => {
       const token = user?.token;
        //jwt...
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) return logout();
            
           
           
        }
            setUser(JSON.parse(localStorage.getItem("profile"))) 
         
    },[location])
    const classes = useStyles();
   
   
     const logout = () => {
        dispatch({ type: "LOGOUT" });
        history("/")
        setUser(null)
    }
    
    

    return (
        
        <AppBar position="static" color="inherit" sx={{ flexDirection: "row" }} className={classes.appBar} > 
            
            <Typography className={classes.heading} component={Link} to="/" sx={{ flexGrow: 1, display: "flex", flexDirection: "row", }}>
                <Typography variant="h3" >Memories</Typography>
                <img src={memoryLogo} height="45px" />
            </Typography>
                        
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar alt={user.result.name} className={classes.profile} src={user.result.imageUrl}></Avatar>
                        <Typography variant="h6" className={classes.userName} component={Link} sx={{textDecoration:"none",color:"black"}} to="/">{user.result.name}</Typography>
                        <Button variant="contained" color="error" onClick={logout}>
                            <Typography variant="body2">Logout</Typography>
                        </Button>
                    </div>
                ): (
                        
                            <Button variant="contained" color="primary">
                                <Typography component={Link} to="/auth" sx={{ textDecoration: "none",color:"white"}}variant="body2">Sign In</Typography>
                            </Button>
                      
                 )}
            </Toolbar>
        </AppBar>
    )
};

export default NavBar;