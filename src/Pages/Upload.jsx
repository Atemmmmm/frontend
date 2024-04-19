import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import UploadButton from '../Components/Button';
import { IoCloudUploadOutline } from "react-icons/io5";
import '../App.css';
// import CustomSelect from '../Components/CustomSelect';
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
  width: 330px;
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
  {key: "POP", value: "POP"}, 
  {key: "ROCK", value: "ROCK"}, 
  {key: "RAP&HIPHOP", value: "RAP&HIPHOP"},
  {key: "INDIE", value: "INDIE"},
  {key: "JAZZ", value: "JAZZ"}, 
  {key: "DANCE", value: "DANCE"},
  {key: "R&B&", value: "R&B"},
  {key: "BALLAD", value: "BALLAD"}
];


/* 장르 선택 버튼 */
const SelectBox = styled.div`
  position: relative;
  width: 200px;
  padding: 8px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #49c181;
    font-size: 20px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 18px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 250px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
  z-index: 100;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

  
export default function Upload(props) {
  const [Title, setTitle] = useState();
  const ImagefileInputRef = useRef();
  const AudiofileInputRef = useRef();
  const inputRef = useRef();
  const [ImageFile, setImageFile] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [AudioFile, setAudioFile] = useState([]);
  const [previewAudio, setPreviewAudio] = useState([]);
  const [Genre, setGenre] = useState("장르 선택");
  const [showOptions, setShowOptions] = useState(false);
  
    const handleOnChangeSelectValue = (e) => {
        const { innerText } = e.target;
        setGenre(innerText);
    };
    

  const onTitleHandler = (e) => {
    // setTitle(encodeURIComponent(e.currentTarget.value));
    setTitle(e.currentTarget.value);
  };

 
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
    const file = e.target.files?.[0];
  
    if (file) {
      setImageFile(file);
      
      const imagePreviewUrl = URL.createObjectURL(file);
      setPreviewImg(imagePreviewUrl);

    }
  }

    useEffect(() => {
      if (previewImg) {
        return () => URL.revokeObjectURL(previewImg);
        }
    }, [previewImg]);



  const handleAudioChange = (e) =>{
    const file = e.target.files?.[0];
  
    if (file) {
      setAudioFile(file);
      
      const AudioPreviewUrl = URL.createObjectURL(file);
      setPreviewAudio(AudioPreviewUrl);

    }
  }

    useEffect(() => {
      if (previewAudio) {
        return () => URL.revokeObjectURL(previewAudio);
        }
    }, [previewAudio]);
  


  const handleUpload = async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('song', AudioFile);
    formData.append('coverImage', ImageFile);
    formData.append('title', Title);
    formData.append('genre', Genre);
    const token = localStorage.getItem("accessToken");

   
    const response = await axios
        .post(`http://artpro.world:8080/api/v1/boards`, formData,
        {
        headers:{
          "Content-type": "multipart/form-data;",
          "Authorization": `Bearer ${token}`,
        }
        })
        .then((response) => {
          console.log(response);
          alert("게시물 업로드에 성공하였습니다!");
        })
        .catch((err) => {
          console.error(err);
          alert(err);
        })
      }

  return (
    <MainBackground>
        <Header/>
      
        <ImageUploadBox type='button' onClick={handleImageButtonClick}>
            {ImageFile != 0? (
              <img src={previewImg} alt={previewImg} style={{width: "400px", height: "auto", margin: "auto", objectFit: "cover"}}/>
              ): (
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                  <IoCloudUploadOutline size="100" />
                  <h3>사진 파일을 업로드 하세요.</h3>
                </div>
              )}
            
        </ImageUploadBox>
        <input type="file" accept='image/*'
                ref={ImagefileInputRef}
                onChange={handleImageChange} 
                style={{display: "none"}}/>

        <WrapContent>
            <TitleInput placeholder="제목을 입력하세요." type="text" onChange={onTitleHandler}/>
          
            <MusicUploadBox type='button' onClick={handleAudioButtonClick}>
                {AudioFile != 0? (

                  <audio src={previewAudio} controls style={{margin: "auto"}}/>
                  
                ): (
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <IoCloudUploadOutline size="30" style={{margin: "18px"}}/>
                    <h3>음원 파일을 업로드 하세요.</h3>
                  </div>
                    )}

            </MusicUploadBox>

            <input type="file" accept='audio/*'
                ref={AudiofileInputRef}
                onChange={handleAudioChange} 
                style={{display: "none"}}/>
            
            <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
              <Label>{Genre}</Label>
              <SelectOptions show={showOptions}>
                {OptionsData && OptionsData.map((data) => (
                  <Option
                    key={data.key}
                    value={data.value}
                    onClick={handleOnChangeSelectValue}
                    
                  >
                    {data.value}
                  </Option>
                ))}
              </SelectOptions>
            </SelectBox>

            

            
        </WrapContent>

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
                onClick={handleUpload}
      
          
            />
        </WrapButton>

    </MainBackground>
  );
}
