import React from 'react';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Main from "./Pages/Main";

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/Login" element = {<Login/>}/>
            <Route path="/SignUp" element = {<SignUp/>}/>
            <Route path="/Main" element = {<Main/>}/>
          </Routes>
    </BrowserRouter>
    
  );
}

export default App;
