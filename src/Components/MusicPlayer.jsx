import React, { useState, useRef } from 'react';

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioPlayer = useRef(null);

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
    <div>
      <audio
        ref={audioPlayer}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={updateTime}
      />
      <div>
        <button onClick={togglePlay}>
          {isPlaying ? '⏸️' : '▶'}
        </button>
        <input
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={handleSeek}
        />
        <div>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
