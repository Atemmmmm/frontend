import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../Components/Header';
import './Album.css'; 
import AlbumCardStyles from '../Components/AlbumCardStyles';
import MusicPlayer from '../Components/MusicPlayer';
import {Link} from "react-router-dom";
import audioTest from '../Components/audio/audioTest.m4a';
import Paging from '../Components/Paging';
import './Genre.css';
import LikeButton from '../Components/LikeButton';
import { BiMessageSquareDetail } from "react-icons/bi";

const Menu = styled.div`
  position: fixed;
  top: 250px;
  left: 60px;
  width: 150px;
  height: 200px;
  font-size: 18px;
`;

const AlbumTitle = styled.div`
  position: sticky;
  height: 10px;
  font-size: 20px;
  text-align: left;
  padding: 0 19.5rem;
  margin: 0 auto;
  margin-bottom: 0px;
  margin-top: 170px;
  color: white;
  align-item: left;
`;

const MenuLink = styled(Link)`
  text-decoration-line: none;
  color:white;
  animation: smoothAppear 1s;
`;

const FeedButton = styled.div`
  height: 30px;
  width: 5px;
  font-size: 20px;
  text-align: left;
  padding: 10px;
  margin: 10px;
  margin-bottom: 15px;
  margin-top: 15px;
  color: white;
  align-item: left;
  font-size: 20pt;
  font-weight: bold;
`;

const ArtistButton = styled.div`
  height: 30px;
  width: 5px;
  font-size: 20px;
  text-align: left;
  padding: 10px;
  margin: 10px;
  margin-bottom: 15px;
  margin-top: 5px;
  color: white;
  align-item: left;
  font-size: 20pt;
  font-weight: bold;
`;

const ProducerButton = styled.div`
  height: 30px;
  width: 5px;
  font-size: 20px;
  text-align: left;
  padding: 10px;
  margin: 10px;
  margin-bottom: 10px;
  margin-top: 5px;
  color: white;
  align-item: left;
  font-size: 20pt;
  font-weight: bold;
`;

const ArtistDropdownMenu = styled.ul`
  display: none;
  position: absolute;
  left: 30px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: black;
  z-index: 1;

  &.show-menu {
    display: block;
    animation: smoothAppear 0.8s;
    opacity: 1;
  }

  &.close-menu {
    opacity: 0;
    animation: fadeout 0.9s;
  }
  &:hover {
    background-color: black;
  }
`;

const ProducerDropdownMenu = styled.ul`
  display: none;
  position: absolute;
  left: 30px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: black;
  z-index: 1;

  &.show-menu {
    display: block;
    animation: smoothAppear 0.8s;
    opacity: 1;
  }

  &.close-menu {
    opacity: 0;
    animation: fadeout 0.9s;
  }
  &:hover {
    background-color: black;
  }
`;


const MenuContainer = styled.div`
&:hover ${ProducerButton} {
  transform: translateY(300px);
}
animation: duration 1s;
`;

const ProducerMenuItemLink = styled.li`
  padding: 10px;
  cursor: pointer;
  text-decoration-line: none;
  color:white;

  &:hover {
    background-color: black;
  }
`;

const ArtistMenuItemLink = styled.li`
  padding: 10px;
  cursor: pointer;
  text-decoration-line: none;
  color:white;

  &:hover {
    background-color: #black;
  }
`;

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-row: repeat(2, 1fr);
  gap: 30px; 
  width: 00px;
  height: 190px;
  margin-top: 20px;
  margin-left: 310px;
  text-align: center;
`;

const AlbumCardContent = styled.div`
  margin-top: 10px;
`;

const AlbumName = styled.div`
  font-weight: bold;
  width: 200px;
  overflow: hidden;  		
  text-overflow: ellipsis;  
  white-space: nowrap; 
`;

const AlbumCardInfo = styled.div`
  width: 200px;
  position: relative;
  top: 10px;
  left: 5px;
  font-weight: bold;
  font-size: 15pt;
  color: white;
  text-align: left;
  padding: 5px;
  overflow: hidden;  		
  text-overflow: ellipsis;  
  white-space: nowrap; 
`;

const AlbumOwnerInfo = styled.div`
  position: relative;
  top: 3px;
  font-size: 11pt;
  color: white;
  margin-top: 5px;
  text-align: left;
  overflow: hidden;
`;

const CloseButton = styled.div`
  position: fixed;
  top: 7px;
  right: 10px;
  align-items: right;
  font-weight: bold;
  cursor: pointer;
`;

const ChatButton = styled.div`
  weight: bold;
  color: white;
  right: 30px;
  margin-top: -68px;
  position: fixed;
`;

// const Paging = styled.div`
//   display: flex;
// `;

export default function Main() {
  const [cardStates, setCardStates] = useState(new Array(8).fill(false));
  const [genreStates, setGenreStates] = useState(new Array(4).fill(false));
  const [isProducerMenuOpen, setIsProducerMenuOpen] = useState(false);
  const [isArtistMenuOpen, setIsArtistMenuOpen] = useState(false);
  const [likeCounts, setLikeCounts] = useState();

  const handleProducerMenuMouseOver = () => {
    setIsProducerMenuOpen(true);
  };
   
  const handleProducerMenuMouseOut = () => {
    setIsProducerMenuOpen(false);
  };

  const handleArtistMenuMouseOver = () => {
    setIsArtistMenuOpen(true);
  };
   
  const handleArtistMenuMouseOut = () => {
    setIsArtistMenuOpen(false);
  };

  const handleClick = (index) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = !newCardStates[index];
    setCardStates(newCardStates);
  };

  const handleCardClose = (index) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = false;
    setCardStates(newCardStates);
  };

  const handleLikeClick = (index) => {
    const newLikeCounts = [...likeCounts];
    newLikeCounts[index] += 1;
    setLikeCounts(newLikeCounts);
  };

  // const genre = [
  //   {
  //     id: 1,
  //     name: POP
  //   },
  //   {
  //     id: 2,
  //     name: ROCK
  //   },
  //   {
  //     id: 3,
  //     name: RAP/HIPHOP
  //   },
  //   {
  //     id: 4,
  //     name: INDIE
  //   },
  //   {
  //     id: 5,
  //     name: JAZZ
  //   },
  //   {
  //     id: 6,
  //     name: DANCE
  //   },
  //   {
  //     id: 7,
  //     name: R&B
  //   },
  //   {
  //     id: 8,
  //     name: BALLAD
  //   } 
  // ]
  const albumList = [
    {
      id: 1,
      name: '고백',
      image: 'img/test1.jpeg',
      owner: '연진엑스',
    },
    {
      id: 2,
      name: '김연진은',
      image: 'img/test2.jpeg',
      owner: '연진엑스',

    },
    {
      id: 3,
      name: '슬프고 주저하는 연인들을 위하여 앞으로 갔다가 뒤로 갔다가 그랜절 쿠크르삥뽕',
      image: 'img/test3.jpeg',
      owner: '연진엑스',
    },
    {
      id: 4,
      name: '바보',
      image: 'img/test4.jpeg',
      owner: '연진엑스',
    },
    {
      id: 5,
      name: '쪼꼼쓰는',
      image: 'img/test5.jpeg',
      owner: '쪼꼼쓰',
    },
    {
      id: 6,
      name: '귀엽고',
      image: 'img/test6.jpeg',
      owner: '큐티파이',
    },
    {
      id: 7,
      name: '예쁘고',
      image: 'img/test7.jpeg',
      owner: '구미베어',
    },
    {
      id: 8,
      name: '사랑스러워',
      image: 'img/test8.jpeg',
      owner: '러블리보이',
    },
  ];

  return (
        <div style={{backgroundColor : 'black', minHeight: '100vh', padding: '20px', overflowY: 'scroll',}}>
        <Header />
        <AlbumTitle>
      <div style={{ width: "185%", margin: "0" }}>
      </div>
        <h4>{genreStates}좋아요를 많이 받은 곡</h4>
        </AlbumTitle>
        <Menu>
          <MenuLink to="/Feed">
              <FeedButton>
                Feed
              </FeedButton>
            </MenuLink>
            
            <MenuLink to ="/Artist">
            <ArtistButton
                onMouseOver={handleArtistMenuMouseOver}
              >
                Artist
              </ArtistButton>
              <ArtistDropdownMenu
                className={isArtistMenuOpen ? "show-menu" : "close-menu"}
                onMouseOver={handleArtistMenuMouseOver}
                onMouseOut={handleArtistMenuMouseOut}
              >
                <ArtistMenuItemLink>POP</ArtistMenuItemLink>
                <ArtistMenuItemLink>ROCK</ArtistMenuItemLink>
                <ArtistMenuItemLink>RAP/HIPHOP</ArtistMenuItemLink>
                <ArtistMenuItemLink>INDIE</ArtistMenuItemLink>
                <ArtistMenuItemLink>DANCE</ArtistMenuItemLink>
                <ArtistMenuItemLink>R&B</ArtistMenuItemLink>
                <ArtistMenuItemLink>BALLAD</ArtistMenuItemLink>
              </ArtistDropdownMenu>
            </MenuLink>
            
            <MenuContainer 
              onMouseOver={handleProducerMenuMouseOver}
            >
              <ProducerButton>
                Producer
              </ProducerButton>
              <ProducerDropdownMenu
              className={isProducerMenuOpen ? "show-menu" : "close-menu"}
              onMouseOver={handleProducerMenuMouseOver}
              onMouseOut={handleProducerMenuMouseOut}
              >
                <ProducerMenuItemLink>POP</ProducerMenuItemLink>
                <ProducerMenuItemLink>ROCK</ProducerMenuItemLink>
                <ProducerMenuItemLink>RAP/HIPHOP</ProducerMenuItemLink>
                <ProducerMenuItemLink>INDIE</ProducerMenuItemLink>
                <ProducerMenuItemLink>DANCE</ProducerMenuItemLink>
                <ProducerMenuItemLink>R&B</ProducerMenuItemLink>
                <ProducerMenuItemLink>BALLAD</ProducerMenuItemLink>
              </ProducerDropdownMenu>
            </MenuContainer>
        </Menu>
        
        <AlbumGrid>
      {albumList.map((album, index) => (
        <AlbumCardStyles key={index}>
        <div className={`album-card ${cardStates[index] ? 'flipped' : ''}`}>
          <div
            className="front"
            onClick={() => handleClick(index)}
          >
            <AlbumCardContent>
              <img
                className="album-image"
                src={album.image}
                alt={album.name}
              />
              <AlbumName>{album.name}</AlbumName>
            </AlbumCardContent>
          </div>
          <div className="back">
              <AlbumCardInfo>
              <AlbumName>{album.name}</AlbumName>
              <AlbumOwnerInfo>{album.owner}</AlbumOwnerInfo>
              <CloseButton onClick={() => handleCardClose(index)}>X</CloseButton>      
                {cardStates[index] && (
                <>
                  <MusicPlayer audioSrc={audioTest} />
                  <LikeButton/>  
                  <Link to="/Chat">
                    <ChatButton>
                      <BiMessageSquareDetail />
                    </ChatButton>   
                  </Link>
                </>
              )}
            </AlbumCardInfo>
          </div>
        </div>
      </AlbumCardStyles>
    ))}
  </AlbumGrid>
  {/* <div>
          <Paging></Paging>
      </div> */}
      </div>
      
  )
} 