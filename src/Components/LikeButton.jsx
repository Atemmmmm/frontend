import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegHeart, FaHeart, FaH } from "react-icons/fa6";

const LikedButton = styled.div`
  font-size: 20px;
  margin-top: -68px;
  left: 25px;
  position: fixed;
  align-items: left;
  cursor: pointer;
`;

const LikeCounter = styled.div`
  font-size: 10px;
  margin-top: -3px;
  margin-left: 6px;
`;

const LikeButton = () => {
  const [likeCounts, setLikeCounts] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setLikeCounts(likeCounts + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <LikedButton onClick={handleLikeClick}>
        {isLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart /> }
        <LikeCounter>{likeCounts}</LikeCounter>
      </LikedButton>
    </div>
  );
};

export default LikeButton;
