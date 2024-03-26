import React from 'react';
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Feed from "./Pages/Feed";
import Artist from "./Pages/Artist";
import Producer from "./Pages/Producer";
import Upload from "./Pages/Upload";
import Edit from "./Pages/Edit";
import Chat from "./Pages/Chat";
import socket from "./server";
import styled from 'styled-components';
import './App.css';
import video from './video/background_video.mp4';

const BackgroundVideo = styled.video`
  position: fixed; 
  right: 0; 
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto; 
  height: auto;
  z-index: -1;
  background-size: cover;
`

function App() {
  return (
      <>
            <BackgroundVideo autoPlay loop muted>
              <source src={video} type='video/mp4'/>
            </BackgroundVideo>
            <Routes>
              <Route path="/Login" element = {<Login/>}/>
              <Route path="/SignUp" element = {<SignUp/>}/>
              <Route path="/Upload" element = {<Upload/>}/>
              <Route path="/Edit" element = {<Edit/>}/>
              <Route path="/Chat" element = {<Chat/>}/>
              <Route path="/Feed" element = {<Feed/>}/>
              <Route path="/Artist" element = {<Artist/>}/>
              <Route path="/Producer" element = {<Producer/>}/>
            </Routes>
     </>
  );
}

export default App;
