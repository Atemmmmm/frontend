import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import './Album.css'; 
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
  border: none;
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
  grid-template-row: repeat(1, 1fr);
  gap: 30px; 
  height: 190px;
  margin-left: 300px;
  margin-top: 80px;
  text-align: center;
`;

const NextSongbutton = styled.div`
  color: white;
  font-weight: bold;
  border: none;
  font-size: 50px;
  text-align : right;
  cursor: pointer;
  margin-top: -15px;
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

  return (
        <div style={{minHeight: '100vh', padding: '20px'}}>
        <Header />
        
        <MemberInfoContainer>
            <MemberImage imageUrl="/image/cute.jpg">
              <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
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
              {albumList && albumList.map((albums, index) => (
                <AlbumCardStyles key={index}>
                  <div className={`album-card ${cardStates[index] ? 'flipped' : ''}`}>
                    <div className="front">
                      <AlbumCardContent>
                        <img
                          className="album-image"
                          src={albums.coverUrl}
                          alt={albums.title}
                        />
                        <AlbumName isLong={albums.title.length > 12}>{albums.title}</AlbumName>
                      </AlbumCardContent>
                    </div>
                  </div>
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
              {albumList && albumList.map((albums, index) => (
                <AlbumCardStyles key={index}>
                  <div className={`album-card ${cardStates[index] ? 'flipped' : ''}`}>
                    <div className="front">
                      <AlbumCardContent>
                        <img
                          className="album-image"
                          src={albums.coverUrl}
                          alt={albums.title}
                        />
                        <AlbumName isLong={albums.title.length > 12}>{albums.title}</AlbumName>
                      </AlbumCardContent>
                    </div>
                  </div>
                </AlbumCardStyles>
              ))}
            </AlbumGrid>
            <NextSongbutton>  </NextSongbutton>
          </LikedSongContainer>
        </div>
      </div>
  )
} 