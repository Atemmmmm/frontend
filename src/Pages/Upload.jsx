import React,{useState} from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import UploadButton from '../Components/Button';
import { IoCloudUploadOutline } from "react-icons/io5";
import '../App.css';
import CustomSelect from '../Components/CustomSelect';

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
export const OptionsData = [
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

  return (
    <MainBackground>
        <Header/>
       
        <ImageUploadBox>
            <IoCloudUploadOutline size="50" />
            <h3>사진 파일을 업로드 하세요.</h3>
            
        </ImageUploadBox>
        <WrapContent>
            <TitleInput placeholder="제목을 입력하세요." type="text"/>
            <MusicUploadBox>
                <IoCloudUploadOutline size="30" style={{margin: "10px"}}/>
                <h4>음원 파일을 업로드 하세요.</h4>
            </MusicUploadBox>
            
            <CustomSelect option={OptionsData}/>

            
        </WrapContent>
        <WrapButton>
            <UploadButton
                color = "white"
                background="#333232"
                width="8rem"
                height="3rem"
                name="Upload"
                borderRadius="2rem" 
                fontWeight={"bold"}
                fontSize={"19px"}
                marginTop={"10rem"}
                borderStyle={"none"}
            />
        </WrapButton>
        
    </MainBackground>
  );
}