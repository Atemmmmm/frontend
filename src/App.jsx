import React from 'react';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Feed from "./Pages/Feed";
import Artist from "./Pages/Artist";
import Producer from "./Pages/Producer";

function App() {
  return (
    <>
          <Routes>
            <Route path="/Login" element = {<Login/>}/>
            <Route path="/SignUp" element = {<SignUp/>}/>
            <Route path="/Feed" element = {<Feed/>}/>
            <Route path="/Artist" element = {<Artist/>}/>
            <Route path="/Producer" element = {<Producer/>}/>
          </Routes>
    </>
    
  );
}

export default App;
