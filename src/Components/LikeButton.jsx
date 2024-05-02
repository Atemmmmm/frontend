import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import axios from "axios";


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


const LikeButton = ({ Backalbum }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const heartId = useState(0);

  const likePressed = async () => {
    try {
      if (liked) {
        const heartId = await fetchLikeCount();
        await axios.delete(`http://artpro.world:8080/api/v1/hearts/${heartId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0QG5hdmVyLmNvbSIsImlkIjo2LCJhdXRoIjoiUk9MRV9BUlRJU1QiLCJleHAiOjE3MTQ3MTMyODV9.N0tNq5vvsvjIJqcVB2cG05OwpKLQaEQ1VihL-uOuOXEL3dDmVGYJWDW746FM1jHH-mYMuazn4XVPHVvvhbcCww`,
          },
        });
        setLiked(false);
        setLikeCount(prevCount => prevCount - 1);
        console.log('Dislike pressed successfully');
      } else {
        await axios.post(`http://artpro.world:8080/api/v1/hearts?boardId=${Backalbum.id}`,
          {
            albumId: Backalbum.id
          }, 
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0QG5hdmVyLmNvbSIsImlkIjo2LCJhdXRoIjoiUk9MRV9BUlRJU1QiLCJleHAiOjE3MTQ3MTMyODV9.N0tNq5vvsvjIJqcVB2cG05OwpKLQaEQ1VihL-uOuOXEL3dDmVGYJWDW746FM1jHH-mYMuazn4XVPHVvvhbcCww`,
            },
          }
        );
        setLiked(true);
        setLikeCount(prevCount => prevCount + 1);
        console.log('Like pressed successfully');
      }
    } catch (error) {
      console.error('Error:', error.response); 
    }
  };

  useEffect(() => {
    if (Backalbum.id) {
      fetchLikeCount();
    }
  }, [Backalbum.id]);

  const fetchLikeCount = async () => {
    try {
      const response = await axios.get(`http://artpro.world:8080/api/v1/hearts?boardId=${Backalbum.id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0QG5hdmVyLmNvbSIsImlkIjo2LCJhdXRoIjoiUk9MRV9BUlRJU1QiLCJleHAiOjE3MTQ3MTMyODV9.N0tNq5vvsvjIJqcVB2cG05OwpKLQaEQ1VihL-uOuOXEL3dDmVGYJWDW746FM1jHH-mYMuazn4XVPHVvvhbcCww`,
        },
      });
      console.log(response.data.likeCount);
      const heartId = response.data.heartId;
      const fetchedLikeCount = response.data.likeCount; 
      setLikeCount(fetchedLikeCount);
      return heartId;     
    } catch (error) {
      console.error('Error fetching like count:', error);
    }
  };

  return (
    <div>
      <LikedButton onClick={likePressed} disabled={liked}>
        {liked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart /> }
        <LikeCounter> {likeCount} </LikeCounter>
      </LikedButton>
    </div>
  );
};

export default LikeButton;

