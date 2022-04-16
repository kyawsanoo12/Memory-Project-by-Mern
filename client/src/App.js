import React, { useEffect, useState } from "react";
import { Container} from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/home/home";
import Auth from "./components/Auth/auth";


const App = () => {
    
   
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/auth" element={ <Auth/>} />
                </Routes>
               
            </Container>
        </BrowserRouter>
    );
};

export default App;