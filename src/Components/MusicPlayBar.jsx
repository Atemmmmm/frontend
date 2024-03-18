import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import audioTest from '../Components/audio/audioTest.m4a';

export default function MusicPlayer(props) {
  const { playing, setPlaying } = props;
  const playerRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [curr, setCurr] = useState(audioTest);

  const onEnded = () => {
    setCurr('audioTest');
    setPlaying(true);
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <>
      <MusicPlayerWrap>
        <ReactPlayer
          url={curr}
          ref={playerRef}
          className='player'
          playing={playing}
          controls={false}
          width='100%'
          height='100%'
          onEnded={onEnded}
          onReady={() => setReady(true)}
          onDuration={setDuration}
          onProgress={({ played }) => setPlayed(played)}
        />
        <ProgressBar>
          <time dateTime='P1S'>{formatTime(played * duration)}</time>
          <input
            type='range'
            min='0'
            max='0.999999'
            step='any'
            value={played}
            disabled={!ready}
            style={{ '--progress': `${played * 100}%` }}
            onChange={(e) => {
              setPlayed(parseFloat(e.target.value));
              playerRef.current.seekTo(parseFloat(e.target.value));
            }}
          />
          <time dateTime='P1S'>{formatTime(duration)}</time>
        </ProgressBar>
      </MusicPlayerWrap>
    </>
  );
}

const MusicPlayerWrap = styled.div`
  position: relative;
  border-radius: 10px;
  width: 328px;
  height: 180px;
  left: 50%;
  transform: translate(-50%, 20%);
  z-index: 2;
  .player {
    position: absolute;
    top: 0%;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: var(--font-sm);
  color: #fff;
  &:disabled {
    display: none;
  }
  input {
    width: 100%;
    height: 3px;
    border-radius: 10px;
    background: linear-gradient(
      to right,
      #fff var(--progress),
      rgba(250, 250, 250, 0.5) 0
    );

    &::-webkit-slider-thumb {
      -webkit-appearance: none; 
      width: 10px;
      height: 10px;
      background: #fff; 
      border-radius: 50%; 
    }
  }
`;
