import React from 'react';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/Login" element = {<Login/>}/>
            <Route path="/SignUp" element = {<SignUp/>}/>
          
          </Routes>
    </BrowserRouter>
    
  );
}

export default App;
