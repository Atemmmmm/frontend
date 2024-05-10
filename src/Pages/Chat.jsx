import { useRef, useState, useEffect, useCallback, onConcat } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import styled from 'styled-components';
import Header from '../Components/Header';
import { IoIosSend } from "react-icons/io";
// import socket from '../server';
import { FaAngleLeft } from "react-icons/fa";
import cute from "../image/cute.jpg";
import { ScrollBar } from '../Components/ScrollBar';
import Clock from 'react-live-clock';
import { CiImageOn } from "react-icons/ci";
import { MdOutlineAudioFile } from "react-icons/md";
import axios from 'axios';


const MainBackground = styled.div`
  position: relative;
  width:100vw;
  height:100vh;

`;
const MainBox = styled.div`
  width: 80%;
  min-width: 480px;
  height: 80vh;
  max-height: 900px;
  min-height: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #EEEEEE;
  border-radius: 50px;
  opacity: 90%;
`;

const LeftContainer = styled.div`
  width: 15rem;
  float: left;
  height: 100%;
  border-radius: 10%;
  margin: 0 5rem;
  margin-bottom: 0;
`

const ChatListContainer = styled.div`
  background-color: white;
  height: 80%;
  border-radius: 50px;
  display: grid;
  width: 18rem;
`

const ChatList = styled.button`
  background-color: white;
  border: none;
  border-radius: 50px;
  heigt: 50px;
`

const Username = styled.text`
  font-size: ${(props) => props.fontSize};
  // font-weight: bold;
  // font-family: "SCDream";
  display: inline-block;
  margin: ${(props) => props.margin};

`

const Usermessage = styled.p`
  margin: 5px 120px 0 0;
  // font-family: "SCDream";
`


const StyledExitIcon = styled(FaAngleLeft)`
  font-size: 40px;
  margin-top: 20px;
  margin-left: 20px;
`

const ChatContainer = styled.div`
  background-color: white;
  width: 55%;
  height: 40rem;
  float: right;
  border-radius: 50px;
  margin: 30px 5rem;
  min-width: 300px;
  position: absolute;
  right: 0;
`

const Inputarea = styled.div`
    min-height:50px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    
`
const PlusButton = styled.div`
  background-color: lightslategray;
  width: 50px;
  color:white;
  font-weight: bold;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`

const Inputcontainer = styled.form`
    display: flex;
    justify-content: space-between;
    width: 100%;
    
`


const MessageInput = styled.input`
  background-color: gray;
  width: 90%;
  height: 50px;
  color: white;
  border-radius: 20px;
  &::placeholder{
		color: white;
    font-size: 15px;
	}

`

const SendButton = styled.button`
    position: absolute;
    right: 5px;
    min-width: 70px;
    background-color: transparent;
    border: none;
    :hover{
      cursor:pointer;
    }
    

`

const StyledSendIcon = styled(IoIosSend)`
  font-size: 50px;
  color: white;
  
  
`

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Message = styled.p`
  background-color: #55667758;
  border-radius: 100px;
  text-align: center;
  color: white;
  padding: 2px 15px;
  font-size: 14px;
`

const StyledDate = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px;
`

const MyMessageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1px;
  margin: 10px;
`

const MyMessage = styled.div`
  background-color: #FCF406;
  border-radius: 8px;
  padding: 8px;
  max-width: 300px;
  font-size: 17px;
  font-bold: bold;
  margin-left: 10px;
  font-family: "Jura_Bold","SCDream",sans-serif;
`

const YourMessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  /* margin-bottom: 5px; */
  align-items: center;  
`

const YourMessage = styled.div`
  background-color: #201D57;
  border-radius: 8px;
  padding: 8px;
  max-width: 300px;
  font-size: 17px;
  font-bold: bold;
  color: white;
  margin: 0 10px;

`
const CHAT = styled.text`
  font-size: 60px;
  font-weight: bold;
  width: 100px;
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;

`

const UserImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 15px;
  margin-top: 10px;
  display: flex;
  float: left;

`
const LastTime = styled.text`
  display: flex;
  float: right;
  margin-top: 25px;

`

const ChatHeader = styled.div`

`

const ChatMiddle = styled.div`
    height: 470px;
`

export default function Chat() {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const scrollRef = useRef();
  const [modal, setModal] = useState(false);
  const ImagefileInputRef = useRef();
  const AudiofileInputRef = useRef();
  const [imageFile, setImageFile] = useState();
  const [audioFile, setAudioFile] = useState();
  const [imageName, setImageName] = useState('');
  

  const handleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageName(file.name);
    setMessage(file.name);
  };

  const handleAudioChange = (e) =>{
    const file = e.target.files[0];
    setAudioFile(file);
    setImageName(file.name);
    setMessage(file.name);
  }

  const onSubmit = (e) => {
    if (message.length == 0) {
      return;
    }
    e?.preventDefault(); // 버튼을 통한 제출이라면 새로고침 방지
    onConcat(message);
    setMessage("");
  };

  const sendMessage = (event)=>{
    const newMessage={
      text: message,
      image: imageFile? URL.createObjectURL(imageFile) : null,
      audio: audioFile? URL.createObjectURL(audioFile): null
    };

    let copyChat = ([...messageList, newMessage]);
    if(message != '') {
      setMessageList(copyChat);
      setMessage('');
      setImageFile(null);
      setAudioFile(null);
      setImageName('');
      
    }
    
    
    console.log("메시지가 전송되었습니다.");
    

    // socket.emit("sendMessage", message, (res)=>{
    //   console.log("sendmessage res", res)
    // })
  }
  
{/* 엔터 클릭시 채팅 보내는 함수 */}
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }
  
{/* 채팅 입력시 맨 아래로 내리는 함수 */}
const scrollToBottom = () => {
  scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
};

useEffect(() => {
  scrollToBottom();
}, [messageList]);

{/* 올린 파일 값에 접근 */}
const handleImageButtonClick = (event) =>{
  event.preventDefault();
  ImagefileInputRef.current?.click(); 
}

const handleAudioButtonClick = (event) =>{
  event.preventDefault();
  AudiofileInputRef.current?.click(); 
}



const handleChange = (event) => {
  const formData = new FormData();
  formData.append('file', event.target.file[0]);
  // const response = apiClient.post('', formData);
  console.log(event.target.files[0]);
};



  // const onChangeImage = (event) => {
  //   const file = event.target.files[0];
  //   const imageUrl = URL.createObjectURL(file);
  //   setUploadedImage(imageUrl);
  // };

  return (

    <MainBackground>
      <Header/>
      <MainBox>
        
        <LeftContainer>
          
          <CHAT>CHAT</CHAT>
          
          <ChatListContainer>
          <ScrollBar>
            <ChatList onClick={ () => setModal(true) }>
              
                <UserImg src={cute} alt="user"/>
                <Username margin="25px 70px 0 0" fontSize="20px">하민</Username>
                <LastTime>PM 10:00</LastTime>
                <Usermessage>메시지</Usermessage>
                
            
            </ChatList>
          
           
            <ChatList onClick={() => setModal(true)}>
              
                <UserImg src={cute} alt="user"/>
                <LastTime>PM 10:00</LastTime>
                <Username margin="25px 70px 0 0" fontSize="20px">하민</Username>
                <Usermessage>메시지</Usermessage>
             
            
            </ChatList>
            </ScrollBar>
          </ChatListContainer>
          </LeftContainer>

          {
              modal && 
              <modal>



        <ChatContainer>
        
          <ChatHeader style={{borderBottom: "1px black solid", display: "flex", alignContent: "center"}}>
            <StyledExitIcon onClick={ () => setModal(false) }/>
            <Username margin="22px 10px" fontSize="25px">하민</Username>
          </ChatHeader>
          <StyledDate>
            <Clock format={'YYYY-MM-DD'} ticking={false} timezone={"Asia/Seoul"} style={{fontSize: "20px"}} />
          </StyledDate>

          <ScrollBar>
            <ChatMiddle ref={scrollRef}>
            
          
            {messageList.map((message, index) => {
              
              return (
                
                <MessageContainer key={index} ref={scrollRef}>
                  
                    <YourMessageContainer>
                      
                      <YourMessage>
                        {message.text}
                        
                      </YourMessage>
                      <Clock format={'A hh:mm'} ticking={false} timezone={"Asia/Seoul"} />
                      
                    </YourMessageContainer> 

                    <MyMessageContainer>
                    <Clock format={'A hh:mm'} ticking={false} timezone={"Asia/Seoul"} />
                      
                        {message.image?
                    
                          <img src={message.image} alt="error"
                          style={{width: "200px", height: "auto", margin: "10px"}}
                          />
                        : (message.audio?
                          <audio src={message.audio} controls
                           style={{margin: "10px"}}/>
                          :
                          <MyMessage>
                                {message.text}
                          </MyMessage>
                        )
                        }
                        
                      </MyMessageContainer>
                    
                  
              </MessageContainer>
              
            );
          })}
          
          
          
          </ChatMiddle>
          </ScrollBar>
       
        
      
          <Inputarea>
            <Inputcontainer onSubmit={onSubmit}>
              
              <CiImageOn type='button'  
                          onClick={handleImageButtonClick} size="40px"
                          style={{marginLeft: "15px"}}/>
             
              <input type="file" accept='image/*'
                ref={ImagefileInputRef}
                onChange={handleImageChange} 
                style={{display: "none"}}/>
              
           
             
              <MdOutlineAudioFile type='button' 
              onClick={handleAudioButtonClick} size="40px"/>

              <input type="file" accept='audio/*'
                ref={AudiofileInputRef}
                onChange={handleAudioChange} 
                style={{display: "none"}}/>

              {/* <PlusButton/> */}
              
              <MessageInput
                placeholder="메세지를 입력하세요."
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyPress}
                multiline={false}
                rows={1}
                
              ></MessageInput>
             

              <SendButton
                type="button"
                onClick={sendMessage}>
                <StyledSendIcon/>
              </SendButton>
            </Inputcontainer>
          </Inputarea>
        </ChatContainer>
        </modal>
            }
      </MainBox>
    </MainBackground>

  );
}