import React,{useState, useRef} from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import UploadButton from '../Components/Button';
import { IoCloudUploadOutline } from "react-icons/io5";
import '../App.css';
import CustomSelect from '../Components/CustomSelect';
import axios from 'axios';

const MainBackground = styled.div`
  width:100%;
  height:100vh;
`;

const ImageUploadBox = styled.div`
  background-color: #EEEEEE;
  border-radius: 30px;
  opacity: 90%;
  display : flex; 
  justify-content: center;
  align-items: center;
  width: 40vw;
  margin: 100px;
  min-width: 350px;
  height: 55vh;
  position: absolute;
  flex-direction: column;
`;

const MusicUploadBox = styled.div`
  width: 300px;
  height: 80px;
  background-color: #EEEEEE;
  border-radius: 30px;
  opacity: 90%;
  display : flex;
  justify-content : center;
  align-items : center;
  
  
`;

const SelectButton = styled.button`
  width: 300px;
  height: 50px;
  background-color: #EEEEEE;
  border-radius: 30px;
  opacity: 90%;
  display : flex;
  justify-content : center;
  align-items : center;
  border: none;

`
const TitleInput = styled.input`
  width: 250px;
  height: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  font-size: 17px;
  display : flex;
`;


const WrapContent = styled.div`
  float: right;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-gap: 80px;
  width: 50vw;
  justify-items: center;

`;

const WrapButton = styled.div`
    position: fixed;
    bottom: 10%;
    right: 20%;
    z-index: 1;
`
const OptionsData = [
  {key: "pop", value: "POP"}, 
  {key: "rock", value: "ROCK"}, 
  {key: "hiphop", value: "HIPHOP"},
  {key: "country", value: "COUNTRY"},
  {key: "classical", value: "CLASSICAL"},
  {key: "jazz", value: "JAZZ"}, 
  {key: "electronic", value: "ELECTRONIC"},
  {key: "r&b", value: "R&B"},
  {key: "ballad", value: "BALLAD"}
];


export default function Upload() {
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const ImagefileInputRef = useRef();
  const AudiofileInputRef = useRef();
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState();
  const [audioFile, setAudioFile] = useState();
  const [imageName, setImageName] = useState('');

  {/* 올린 파일 값에 접근 */}
  const handleImageButtonClick = (event) =>{
    event.preventDefault();
    ImagefileInputRef.current?.click(); 
  }

  const handleAudioButtonClick = (event) =>{
    event.preventDefault();
    AudiofileInputRef.current?.click(); 
  }

  const handleImageChange = (e) => {
    
    const file = e.target.files[0];
    setImageFile(file);

  };

  const handleAudioChange = (e) =>{
    const file = e.target.files[0];
    setAudioFile(file);

  }

  const handleUpload = (e) => {
    // e.preventDefault();
    // const file = e.target.files[0];

    // const formData = new FormData();
    // formData.append("file", 
    // );

    // const postPhoto = () => {
    //   return axios({
    //     url: "/api/photos",
    //     method: "post",
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data charset=UTF-8" },
    //   }).then((response) => {
    //     // return history.push("/Colorizefinish/" + response.data.color_photo_id);
    //   });
    // };

    // postPhoto().catch((error) => {
    //   if (error.response.status === 401) {
    //     axios({
    //       url: "/api/refresh",
    //       method: "get",
    //     }).then((response) => {
    //       postPhoto();
    //     });
    //   }
    //   if (error.response.status === 413) {
    //     window.alert("사진 파일이 너무 큽니다. 다른 파일을 입력해주세요.");
    //     return;
    //   }
    // });
  };
  const handleButtonClick = (e) =>{
    const formData = new FormData();
    const contentsData = {
      title,
      genre,
      imageFile,
      audioFile,
    }
    const fileData = inputRef.current.file.files;
            
    for(let i = 0; i < fileData.length; i++) {
      formData.append("file", fileData[i]);
    }

    formData.append("contentsData", new Blob([JSON.stringify(contentsData)], 
    { type: "application/json" }));}
      
    axios
        .post("http://artpro.world:8080/api/")
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err);
        });


  return (
    <MainBackground>
        <Header/>

        <form onSubmit={handleUpload}>
        <ImageUploadBox type='button' onClick={handleImageButtonClick}>
          {imageFile === ""? (
            <IoCloudUploadOutline size="50" />
            // <h3>사진 파일을 업로드 하세요.</h3>
            ): (
              <img src={imageFile} style={{width: "300px", height: "auto", margin: "auto", objectFit: "cover"}}/>
            )}
            
            
        </ImageUploadBox>
        <input type="file" accept='image/*'
                ref={ImagefileInputRef}
                onChange={handleImageChange} 
                style={{display: "none"}}/>

        <WrapContent>
            <TitleInput placeholder="제목을 입력하세요." type="text"/>
            <MusicUploadBox type='button' onClick={handleAudioButtonClick}>
                <IoCloudUploadOutline size="30" style={{margin: "10px"}}/>
                <h4>음원 파일을 업로드 하세요.</h4>
            </MusicUploadBox>
            <input type="file" accept='audio/*'
                ref={AudiofileInputRef}
                onChange={handleAudioChange} 
                style={{display: "none"}}/>
            
            <CustomSelect option={OptionsData}/>

            
        </WrapContent>
        </form>
        <WrapButton>
            <UploadButton
                color = "white"
                background="#333232"
                width="8rem"
                height="3rem"
                name="Upload"
                borderRadius="2rem" 
                fontweight={"bold"}
                fontsize={"19px"}
                margintop={"10rem"}
                borderstyle={"none"}
                onClick={handleButtonClick}
                type="submit"
            />
        </WrapButton>
        
    </MainBackground>
  );
  
}