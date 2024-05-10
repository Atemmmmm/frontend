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
import styled from 'styled-components';
import './App.css';
import video from './video/background_video.mp4';
import {useSelector} from "react-redux";

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
  const token = useSelector((state) => state.Auth.token);
  console.log(token);
  return (
      <>
            <BackgroundVideo autoPlay loop muted>
              <source src={video} type='video/mp4'/>
            </BackgroundVideo>
            <Routes>
              <Route path="/" element = {<Feed/>}/>
              <Route path="/Login" element = {<Login/>}/>
              <Route path="/SignUp" element = {<SignUp/>}/>
              <Route path="/Upload" element = {<Upload/>}/>
              <Route path="/Edit/:id" element = {<Edit/>}/>
              <Route path="/Chat/:room" element = {<Chat/>}/>
              <Route path="/Artist" element = {<Artist/>}/>
              <Route path="/Producer" element = {<Producer/>}/>
            </Routes>
     </>
  );
}

export default App;
