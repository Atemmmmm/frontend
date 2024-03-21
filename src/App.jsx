import React from 'react';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Update from "./Pages/Update";
import Edit from "./Pages/Edit";
import Chat from "./Pages/Chat";
import socket from "./server";
import styled from 'styled-components';
import './App.css';

const FontDefault = styled.div`
  font-family: "Jura", "SCDream", sans-serif;
`
function App() {
  return (
    
      <BrowserRouter>
            <Routes>
              <Route path="/Login" element = {<Login/>}/>
              <Route path="/SignUp" element = {<SignUp/>}/>
              <Route path="/Update" element = {<Update/>}/>
              <Route path="/Edit" element = {<Edit/>}/>
              <Route path="/Chat" element = {<Chat/>}/>
            </Routes>
      </BrowserRouter>

  );
}

export default App;
