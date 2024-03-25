import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../Components/Header';
import './Album.css'; 
import AlbumCardStyles from '../Components/AlbumCardStyles';
import MusicPlayer from '../Components/MusicPlayer';
import {Link, useNavigate } from "react-router-dom";
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
  margin-top: 140px;
  color: white;
  align-item: left;
`;

const MenuLink = styled(Link)`
  text-decoration-line: none;
  color:white;
  animation: smoothAppear 1s;
`;

const FeedButton = styled.div`
  height: 15px;
  width: 5px;
  font-size: 20px;
  text-align: left;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: white;
  align-item: left;
  font-size: 20pt;
  font-weight: bold;
`;

const ArtistButton = styled.div`
  height: 15px;
  width: 5px;
  font-size: 20px;
  text-align: left;
  padding: 15px;
  color: white;
  align-item: left;
  font-size: 20pt;
  font-weight: bold;
  display: inline-block;

  &:hover {
    color: #777;
  }
`;

const ArtistDropdownMenu = styled.ul`
  color: white;
  height: ${props => (props.isOpen ? '350px' : '0px')};
  overflow: hidden;
`;

const ProducerButton = styled.div`
  height: 15px;
  width: 5px;
  font-size: 20px;
  text-align: left;
  padding: 15px;
  color: white;
  align-item: left;
  font-size: 20pt;
  font-weight: bold;
  display: inline-block;

  &:hover {
    color: #777;
  }
`;

const ProducerDropdownMenu = styled.ul`
  color: white;
  height: ${props => (props.isOpen ? '350px' : '0px')};
  overflow: hidden;
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
  text-overflow: ellipsis;  
  white-space: nowrap; 

  @media (min-width: 481px) {
    & {
      animation: ${props => (props.isLong ? 'marquee 10s linear infinite' : 'none')};
    }
  }

  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-100%); 
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
  cursor: pointer;
`;

export default function Main() {
  const [cardStates, setCardStates] = useState(new Array(8).fill(false));
  const [genreStates, setGenreStates] = useState(new Array(4).fill(false));
  const [isProducerMenuOpen, setIsProducerMenuOpen] = useState(false);
  const [isArtistMenuOpen, setIsArtistMenuOpen] = useState(false);
  const [likeCounts, setLikeCounts] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const dropdownRef = useRef(null);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

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

  const navigate = useNavigate();
  const onClickArtistGenreBtn = (genre) => () => {
    navigate(`?category=artist&genre=${genre.name}`);
  };

  const onClickProducerGenreBtn = (genre) => () => {
    navigate(`?category=producer&genre=${genre.name}`);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsArtistMenuOpen(false);
    }
  }

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
      name: '슬프고 주저하는 연인들을 위하여',
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
      name: '사랑스러워 울애기들',
      image: 'img/test8.jpeg',
      owner: '러블리보이',
    },
  ];

  const genre = [
      {
        id: 1,
        name: 'POP'
      },
      {
        id: 2,
        name: 'ROCK'
      },
      {
        id: 3,
        name: 'RAP&HIPHOP'
      },
      {
        id: 4,
        name: 'INDIE'
      },
      {
        id: 5,
        name: 'JAZZ'
      },
      {
        id: 6,
        name: 'DANCE'
      },
      {
        id: 7,
        name: 'R&B'
      },
      {
        id: 8,
        name: 'BALLAD'
      } 
    ]

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
            <div onClick={handleClickOutside}>
              <ArtistButton
                  onMouseOver={handleArtistMenuMouseOver}
                  onMouseOut={handleArtistMenuMouseOut}
                >
                  Artist
              </ArtistButton>
                <ArtistDropdownMenu isOpen={isArtistMenuOpen} ref={dropdownRef}
                >
                  {genre.map((genre, index) => (
                  <div key={genre.id} onClick={onClickArtistGenreBtn(genre)}>
                    <p>{genre.name}</p>
                  </div>
                  ))}
                </ArtistDropdownMenu>
            </div>
              
            <div onClick={handleClickOutside}>
              <ProducerButton
                  onMouseOver={handleProducerMenuMouseOver}
                >
                  Producer
                </ProducerButton>
                <ProducerDropdownMenu isOpen={isProducerMenuOpen} ref={dropdownRef}
                >
                  {genre.map((genre, index) => (
                  <div key={genre.id} onClick={onClickProducerGenreBtn(genre)}>
                    <p>{genre.name}</p>
                  </div>
                  ))}
              </ProducerDropdownMenu>
            </div>
                
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
                    <AlbumName isLong={album.name.length > 12}>{album.name}</AlbumName>
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
      <Paging
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  )
} 