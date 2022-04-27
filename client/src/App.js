import React, { useEffect, useReducer, useState } from "react";
import { Container} from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/home/home";
import Auth from "./components/Auth/auth";
import PostDetail from "./components/postDetails/postDetail";


const App = () => {
    
    const [user,setUser]=useState(JSON.parse(localStorage.getItem("profile")))
   
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")))
    },[])
   
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate to="/posts"/>} />
                    <Route path="/posts" element={<Home />} />
                     <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={ <PostDetail/>}/>
                    <Route path="/auth" element={!user?<Auth/>:<Navigate to="/posts"/>} />
                </Routes>
               
            </Container>
        </BrowserRouter>
    );
};

export default App;