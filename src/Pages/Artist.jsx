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
import axios from "axios";


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
  margin-top: 75px;
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

  &:hover {
    color: #777;
  }
`;

const ArtistButton = styled.div`
  height: 15px;
  width: 5px;
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 15px;
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
  height: ${props => (props.isOpen ? '300px' : '0px')};
  overflow: hidden;
  margin-left: -10px;
  margin-top: -5px;
`;

const ProducerButton = styled.div`
  height: 15px;
  width: 5px;
  font-size: 20px;
  text-align: left;
  margin-top: 20px;
  margin-left: 15px;
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
  margin-left: -10px;
  margin-top: -5px;
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

  /* 카드 앞쪽의 앨범 제목과 사진 감싸는 컨테이너 */
  const AlbumCardContent = styled.div`
  margin-top: 10px;
`;

  /* 카드 앞쪽의 앨범 제목 */
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

  /* 카드 딋쪽의 앨범 제목 */
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

  /* 카드 뒷쪽의 앨범 소유자 */
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
  const [currentPage, setCurrentPage] = useState(0);
  const dropdownRef = useRef(null);
  const [albumList, setAlbumList] = React.useState([]);

  const requestToServer = () => {axios.get(`http://artpro.world:8080/api/v1/boards?page=0&size=8&sort=string&category=ARTIST&orderBy=likeCount&genre=BALLAD`, {
    headers: {
      Authorization: ``,
    },
  })
  .then((res) => {
    console.log(res);
    const albumList = res.data.content;
    setAlbumList(albumList);
    console.log(albumList);
  }
  );
  }

  /* 페이징 */
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  /* 프로듀서 버튼에 마우스 올렸을 때 */
  const handleProducerMenuMouseOver = () => {
    setIsProducerMenuOpen(true);
  };

  /* 프로듀서 버튼에서 마우스 뗐을 때 */
  const handleProducerMenuMouseOut = () => {
    setIsProducerMenuOpen(false);
  };

  /* 아티스트 버튼에 마우스 올렸을 때 */
  const handleArtistMenuMouseOver = () => {
    setIsArtistMenuOpen(true);
  };
   
  /* 아티스트 버튼에서 마우스 뗐을 때 */
  const handleArtistMenuMouseOut = () => {
    setIsArtistMenuOpen(false);
  };

  /* 카드 앞에서 뒤로 뒤집을 때 */
  const handleClick = (index) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = !newCardStates[index];
    setCardStates(newCardStates);
  };

  /* 카드 뒤에서 앞으로 뒤집을 때 */
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
        <div style={{minHeight: '100vh', padding: '20px', overflowY: 'scroll',}}>
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
            <div onClick={requestToServer}>
              <ArtistButton
                  onMouseOver={handleArtistMenuMouseOver}
                  onMouseOut={handleArtistMenuMouseOut}
                >
                  Artist
              </ArtistButton>
                <ArtistDropdownMenu isOpen={isArtistMenuOpen} ref={dropdownRef}
                >
                  {genre.map((genre, index) => (
                  <div key={index} onClick={onClickArtistGenreBtn(genre)}>
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
                  <div key={index} onClick={onClickProducerGenreBtn(genre)}>
                    <p>{genre.name}</p>
                  </div>
                  ))}
              </ProducerDropdownMenu>
            </div>      
        </Menu>
        
        <AlbumGrid>
          {albumList.map((albums, index) => (
            <AlbumCardStyles key={index}>
              <div className={`album-card ${cardStates[index] ? 'flipped' : ''}`}>
                <div
                  className="front"
                  onClick={() => handleClick(index)}
                >
                  <AlbumCardContent>
                    <img
                      className="album-image"
                      src={albums.coverUrl}
                      alt={albums.title}
                    />
                    <AlbumName isLong={albums.title.length > 12}>{albums.title}</AlbumName>
                  </AlbumCardContent>
                </div>
                <div className="back">
                  <AlbumCardInfo>
                    <AlbumName>{albums.title}</AlbumName>
                    <AlbumOwnerInfo>{albums.owner}</AlbumOwnerInfo>
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