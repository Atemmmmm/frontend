import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import LoginButton from '../Components/Button';


const MainBackground = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
  background-color: black;
  pointer-events: none;
`;

const MainBox = styled.div`
  width: 60%;
  max-width: 800px;
  min-width: 480px;
  height: 70vh;
  max-height: 900px;
  min-height: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #EEEEEE;
  border-radius: 7%;
  opacity: 90%;
`;

const Title = styled.h1`
  height: 100px;
  font-size: 50px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 0px;
  margin-top: 8vh;
  color: black;
  align-item: center;
`;


const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 17px;
`;

const WrapContent = styled.div`
  width: 60%;
  position: absolute;
  top: 59%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;


export default function Login() {
  return (
    <MainBackground>
        <Header/>
       
        <MainBox>
            <Title>LOGIN</Title>
            <WrapContent>
                <Input placeholder="아이디를 입력해주세요" type="text"/>

                <Input placeholder="비밀번호를 입력해주세요" type="password" />

                <LoginButton
                    color = "white"
                    background="#333232"
                    width="8rem"
                    height="3rem"
                    name="Login"
                    borderRadius="2rem" 
                    fontWeight={"bold"}
                    fontSize={"19px"}
                    marginTop={"1.5rem"}
                    borderStyle={"none"}
                />
        
            </WrapContent>    
        </MainBox>
    </MainBackground>
  );
}