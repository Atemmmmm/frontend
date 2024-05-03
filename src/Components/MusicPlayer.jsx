import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import axios from "axios";


const AudioPlayerContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 75px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  position: relative;
`;

const ProgressBar = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: #white;
  outline: none;
  border-radius: 10px;
  margin-bottom: 5px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-ms-thumb {
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const TimeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #999;
  font-size: 13px;
`;

const PlayButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  margin-top: 0px;
`;

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioPlayer = useRef(null);
  const [Backalbum, setBackAlbum] = React.useState([]);

  const playMusic = (id) => {axios.get(`http://artpro.world:8080/api/v1/boards/${id}`, {
    headers: {
      Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc3NzQG5hdmVyLmNvbSIsImlkIjoxNywiYXV0aCI6IlJPTEVfQVJUSVNUIiwiZXhwIjoxNzEyMTI0ODY1fQ.BNF8W9rysREk9vYBJ30HrrssBc9ZstXVd-AWfXMzNu_TwZFh9FBXcxpbQQyx2BzCFa-k9MIhikQor1i5fuDn_A`,
    },
  })
  .then((res) => {
    const Backalbum = res.data;
    setBackAlbum(Backalbum);
  }
  );
  }

  const togglePlay = () => {
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateTime = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    setDuration(audioPlayer.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = () => {
    updateTime();
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioPlayer.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <AudioPlayerContainer>
      <PlayButton onClick={togglePlay}>
        {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
      </PlayButton>
      <ProgressBarContainer>
        <ProgressBar
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={handleSeek}
        />
        <TimeLabels>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </TimeLabels>
      </ProgressBarContainer>
      
      <audio
        ref={audioPlayer}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={updateTime}
      />
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
