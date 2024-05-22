import React, { useState, useEffect } from 'react';
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
  margin-top: 50px;
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
  margin-top: 15px;
  margin-left: 0px;
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
  margin-right: 50px;

  &::after {
    content: ">" ;
  }
`;

const PrevSongbutton = styled.div`
  color: white;
  font-weight: bold;
  border: none;
  font-size: 50px;
  margin-top: 50px;
  margin-left: 280px;
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
  const [uploadedAlbumList, setuploadedAlbumList] = React.useState([]);
  const [likedAlbumList, setlikedAlbumList] = React.useState([]);
  const [memberInfo, setmemberInfo] = React.useState([]);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const isFirstPage = currentPage === 1;

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  /* 페이지네이션을 위한 현재 페이지 연동 */
    const pageChange = () => {
      const token = localStorage.getItem("accessToken");
      axios.get(`http://artpro.world:8080/api/v1/members/boards?page=${currentPage}&size=4&sort=string`, {
      headers:{
        "Authorization": `Bearer ${token}`,
      }
    })
    .then((res) => {
      const uploadedAlbumList = res.data.content;
      setuploadedAlbumList(uploadedAlbumList);
      })
      .catch(error => {
        console.error('Error fetching uploaded albums:', error);
      }
    )
    .catch(error => {
      console.error('Error fetching Pages:', error);
    });
  } 

  useEffect(( )=>{
    /* 사용자 닉네임과 사진 가져오는 함수 */
  const getMemberInfo = () => {
    const token = localStorage.getItem("accessToken");
    axios.get(`http://artpro.world:8080/api/v1/members`, {
      headers:{
        "Authorization": `Bearer ${token}`,
      }
    })
    .then((res) => {
      const memberInfo = res.data;
      setmemberInfo(memberInfo);
      })
      .catch(error => {
        console.error('Error fetching Infos:', error);
      });
    }
  void getMemberInfo();
  }
)

  useEffect(( )=>{
    /* 업로드한 앨범 연동 함수 - 노래 제목, 커버 사진 */
  const uploadedalbum = () => {
    const token = localStorage.getItem("accessToken");
    axios.get(`http://artpro.world:8080/api/v1/members/boards?page=${currentPage}&size=4&sort=string`, {
    headers:{
      "Authorization": `Bearer ${token}`,
    }
  })
  .then((res) => {
    const uploadedAlbumList = res.data.content;
    setuploadedAlbumList(uploadedAlbumList);
    isFirstPage(true);
    })
    .catch(error => {
      console.error('Error fetching uploaded albums:', error);
    });
  }
  void uploadedalbum();
  }, []);

  useEffect(( )=>{
  /* 좋아요 누른 앨범 연동 - 노래 제목, 커버 사진 */
  const likedAlbum = () => {
    const token = localStorage.getItem("accessToken");
    axios.get(`http://artpro.world:8080/api/v1/members/hearts?page=${currentPage}&size=4&sort=string`,{
    headers:{
      "Authorization": `Bearer ${token}`,
    }
  })
  .then((res) => {
    const likedAlbumList = res.data.content;
    setlikedAlbumList(likedAlbumList);
    })
    .catch(error => {
      console.error('Error fetching liked albums:', error);
    });
  }
  void likedAlbum();
  }, []);

  const changeNextPage = () => {
    setCurrentPage(currentPage + 1);
    pageChange();
  }

  const changePrevPage = () => {
    setCurrentPage(currentPage - 1);
    pageChange();
  }

  const handleClick = (event, index) => {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    setMenuPosition({ x: clickX, y: clickY });
    setIsMenuOpen(!isMenuOpen);
    setSelectedCardIndex(index); 
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
        <div style={{minHeight: '100vh', padding: '20px'}}>
        <Header />
        
        <MemberInfoContainer>
            <MemberImage>
              {memberInfo.profileImage}
            </MemberImage>
          
            <EditButton to="/Edit">Edit</EditButton>
            <NickName>{memberInfo.nickname}</NickName>
        </MemberInfoContainer>

        <div>
          <AlbumTitle>
            <h4> 내가 업로드한 노래 </h4>
          </AlbumTitle> 
          <UploadSongContainer>
            {isFirstPage ? null : <PrevSongbutton onClick={changePrevPage}> </PrevSongbutton>} 

            <AlbumGrid>
              {uploadedAlbumList && uploadedAlbumList.map((albums, index) => (
                <AlbumCardStyles key={index}>
                  <div className="album-card">
                    <div className="front" onClick={(event) => handleClick(event, index)}>
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
                  {isMenuOpen && selectedCardIndex === index && ( 
                    <DropdownMenu onClose={handleCloseMenu} />
                  )}
                </AlbumCardStyles>
              ))}
              </AlbumGrid>

            <NextSongbutton onClick={changeNextPage} > </NextSongbutton>
          </UploadSongContainer>
        </div>

        <div>
          <AlbumTitle>
            <div style={{ width: "105%", margin: "0" }}> </div>
            <h4>내가 좋아요 누른 노래</h4>
          </AlbumTitle>  

          <LikedSongContainer>
            <AlbumGrid>
              {likedAlbumList && likedAlbumList.map((albums, index) => (
                <AlbumCardStyles key={index}>
                  <div className="album-card">
                    <div className="front" onClick={(event) => handleClick(event, index)}>
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