import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import './Album.css'; 
import DropdownMenu from '../Components/DropDownMenu';
import AlbumCardStyles from '../Components/AlbumCardStyles';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AlbumTitle = styled.div`
  position: sticky;
  height: 10px;
  font-size: 20px;
  text-align: left;
  padding: 0 22rem;
  margin: 0 auto;
  margin-top: 70px;
  color: white;
  align-item: left;
`;

const MemberInfoContainer = styled.div`
  position: fixed;
  top: 250px;
  left: 100px;
`;

const MemberImage = styled.div`
  text-decoration-line: none;
  width: 180px; 
  height: 180px; 
  border-radius: 50%;
`;

const EditButton = styled(Link)`
  margin-left: 80px;
  color: white;
  text-decoration: none;
  background-color: #333232;
  padding: 5px 8px;
  border-radius: 30%;
  font-weight: bold; 
`;

const NickName = styled.p`
  font-weight: bold;
  font-size: 25px; 
  color: white; 
  text-align: center;
`;

/* 내가 올린 곡의 grid와 버튼을 감싸는 컨테이너 */
const UploadSongContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* 좋아요를 누른 곡들의 grid와 버튼을 감싸는 컨테이너 */
const LikedSongContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px; 
  height: 190px;
  margin-left: 350px;
  margin-top: 25px;
  text-align: center;
`;

const NextSongbutton = styled.div`
  color: white;
  font-weight: bold;
  border: none;
  font-size: 50px;
  text-align : right;
  cursor: pointer;
  margin-top: 50px;
  margin-right: 40px;

  &::after {
    content: ">" ;
  }
`;

const PrevSongbutton = styled.div`
  color: white;
  border: none;
  font-size: 50px;
  cursor: pointer;

  &::before {
    content: "<";
  }
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

export default function Main() {
  const [cardStates, setCardStates] = useState(new Array(8).fill(false));
  const [albumList, setAlbumList] = React.useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstPage = currentPage === 1;

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  

  const handleClick = (event, index) => {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    setMenuPosition({ x: clickX, y: clickY });
    setIsMenuOpen(!isMenuOpen);
    setSelectedCardIndex(index); // 클릭한 카드의 인덱스를 상태에 저장합니다.
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const dummyData = [
    { title: 'Album 1', coverUrl: 'album1.jpg' },
    { title: 'Album 2', coverUrl: 'album2.jpg' },
    { title: 'Album 3', coverUrl: 'album2.jpg' },
    { title: 'Album 4', coverUrl: 'album2.jpg' }
  ];

  return (
        <div style={{minHeight: '100vh', padding: '20px'}}>
        <Header />
        
        <MemberInfoContainer>
            <MemberImage imageUrl="/image/cute.jpg">
              <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            </MemberImage>
            <EditButton to="/Edit">Edit</EditButton>
            <NickName> YeonJinX </NickName>
        </MemberInfoContainer>

        <div>
          <AlbumTitle>
            <h4> 내가 업로드한 노래 </h4>
          </AlbumTitle> 
          <UploadSongContainer>
            {isFirstPage ? null : <PrevSongbutton> </PrevSongbutton>} 

            <AlbumGrid>
              {dummyData.map((album, index) => (
                <AlbumCardStyles key={index}>
                  <div className="album-card">
                    <div className="front" onClick={(event) => handleClick(event, index)}>
                      <AlbumCardContent>
                        <img
                          className="album-image"
                          src={album.coverUrl}
                          alt={album.title}
                        />
                        <AlbumName isLong={album.title.length > 12}>{album.title}</AlbumName>
                      </AlbumCardContent>
                    </div>
                  </div>
                  {isMenuOpen && selectedCardIndex === index && ( 
                    <DropdownMenu onClose={handleCloseMenu} />
                  )}
                </AlbumCardStyles>
              ))}
              </AlbumGrid>

            <NextSongbutton> </NextSongbutton>
          </UploadSongContainer>
        </div>

        <div>
          <AlbumTitle>
            <div style={{ width: "105%", margin: "0" }}> </div>
            <h4>내가 좋아요 누른 노래</h4>
          </AlbumTitle>  

          <LikedSongContainer>
            <AlbumGrid>
              {dummyData.map((album, index) => (
                <AlbumCardStyles key={index}>
                  <div className="album-card">
                    <div className="front" onClick={(event) => handleClick(event, index)}>
                      <AlbumCardContent>
                        <img
                          className="album-image"
                          src={album.coverUrl}
                          alt={album.title}
                        />
                        <AlbumName isLong={album.title.length > 12}>{album.title}</AlbumName>
                      </AlbumCardContent>
                    </div>
                  </div>
                  {isMenuOpen && selectedCardIndex === index && ( 
                    <DropdownMenu onClose={handleCloseMenu} />
                  )}
                </AlbumCardStyles>
              ))}
              </AlbumGrid>
            <NextSongbutton>  </NextSongbutton>
          </LikedSongContainer>
        </div>
      </div>
  )
} 