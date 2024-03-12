import { useRef, useState, useEffect, useCallback, onConcat } from 'react';
import { Link,useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import styled from 'styled-components';
import Header from '../Components/Header';
import { IoIosSend } from "react-icons/io";
// import socket from '../server';
import { FaAngleLeft } from "react-icons/fa";
import cute from "../image/cute.jpg";
import { ScrollBar } from '../Components/ScrollBar';
import Clock from 'react-live-clock';

const MainBackground = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
  background-color: black;
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
  width: 30%;
  float: left;
  height: 100%;
  border-radius: 10%;
  margin: 0 3rem;
  margin-bottom: 0;
`
const ChatListContainer = styled.div`
  background-color: white;
  height: 80%;
  border-radius: 50px;
  display: grid;
`

const ChatList = styled.button`
  background-color: white;
  border: none;
  border-radius: 50px;
  heigt: 20px;
`

const Username = styled.text`
  font-size: ${(props) => props.fontSize};
  font-weight: bold;
  display: inline-block;
  margin: ${(props) => props.margin};

`

const Usermessage = styled.p`
  margin: 5px 100px 0 0 ;
`


const StyledExitIcon = styled(FaAngleLeft)`
  font-size: 40px;
  margin-top: 20px;
  margin-left: 20px;
`

const ChatContainer = styled.div`
  background-color: white;
  width: 50%;
  height: 40rem;
  float: left;
  margin-top: 30px;
  border-radius: 50px;
  margin-left: 30px;
`

const Inputarea = styled.div`
    min-height:50px;
    position: absolute;
    bottom: 30px;
    width: 50%;
    
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
    position: relative;
`

const MessageInput = styled.input`
  background-color: gray;
  width: 100%;
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
    background-color:transparent;
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
    margin: 10px;
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
  background-color: #f7e600;
  border-radius: 8px;
  padding: 8px;
  max-width: 200px;
  font-size: 20px;
  font-bold: bold;
  margin-left: 10px;
`

const YourMessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  /* margin-bottom: 5px; */
  align-items: center;  
`

const YourMessage = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  max-width: 200px;
  font-size: 12px;
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

const ChatHeader = styled.div`

`

const ChatMiddel = styled.div`
    height: 400px;
`
export default function Chat() {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const scrollRef = useRef();
  const [modal, setModal] = useState(false);

  const onChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const onSubmit = (e) => {
    if (message.length == 0) {
      return;
    }
    e?.preventDefault(); // 버튼을 통한 제출이라면 새로고침 방지
    onConcat(message);
    setMessage("");
  };

  const sendMessage = (event)=>{
    
    let copyChat = [...messageList];
    if(message != '') {
      copyChat.push(message);
      setMessageList(copyChat);
      setMessage('');
      
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
                <Username margin="25px 100px 0 0" fontSize="20px">하민</Username>
                <Usermessage>메시지</Usermessage>
            
            </ChatList>
          
           
            <ChatList onClick={ () => setModal(true) }>
              
                <UserImg src={cute} alt="user"/>
                <Username margin="25px 100px 0 0" fontSize="20px">하민</Username>
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
            <Clock format={'YYYY-MM-DD'} ticking={false} timezone={"Asia/Seoul"} />
          </StyledDate>
          <ScrollBar>
            <ChatMiddel ref={scrollRef}>
            
          
            {messageList.map((message) => {
              return (
                
                <MessageContainer key={message._id} ref={scrollRef}>
                  
                    <MyMessageContainer>
                    <Clock format={'A hh:mm'} ticking={false} timezone={"Asia/Seoul"} />
                      <MyMessage>{message}</MyMessage>
                    </MyMessageContainer>
                  
                    {/* <YourMessageContainer>
                      <img
                        src="/profile.jpeg"
                        className="profile-image"
                        style={
                          (index === 0
                            ? { visibility: "visible" }
                            : messageList[index - 1].user.name === user.name) ||
                          messageList[index - 1].user.name === "system"
                            ? { visibility: "visible" }
                            : { visibility: "hidden" }
                        } */}
                      {/* />
                      <YourMessage>{message}</YourMessage>
                    </YourMessageContainer> */}
                  
              </MessageContainer>
              
            );
          })}
          
          
          
          </ChatMiddel>
          </ScrollBar>
       
        
      
          <Inputarea>
            <Inputcontainer onSubmit={onSubmit}>
              <MessageInput
                placeholder="메세지를 입력하세요."
                value={message}
                onChange={onChange}
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