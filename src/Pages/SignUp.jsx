import React, {useState, useContext} from 'react';
import styled, {css} from 'styled-components';
import Header from '../Components/Header';
import SubmitButton from '../Components/Button';
import RadioGroup from '../Components/RadioGroup';
import Radio from '../Components/Radio';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../_actions/user_action";

import axios from 'axios';

const MainBackground = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
`;

const MainBox = styled.form`
  width: 60%;
  max-width: 800px;
  min-width: 480px;
  height: 80vh;
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
  margin-top: 6vh;
  color: black;
  align-item: center;
  
`;


const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 17px;
`;

const WrapRadioButton = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`

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


export default function SignUp(props) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [CheckPasword, setCheckPassword] = useState("");
    const [Role, setRole] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onEmailHandler = (e) => {
      setEmail(e.currentTarget.value);
    };
  
    const onNameHandler = (e) => {
      setName(e.currentTarget.value);
    };
  
    const onPasswordHanlder = (e) => {
      setPassword(e.currentTarget.value);
    };
  
    const onCheckPasswordHandler = (e) => {
      setCheckPassword(e.currentTarget.value);
    };
    
    const onSubmitHandler = (e) => {
      e.preventDefault(); // 버튼 누르면 리프레시 되는 것을 막아줌
      setRole(e.currentTarget.role.value);

    
      if (Password === CheckPasword) {
        let body = {
          email: Email,
          nickname: Name,
          password: Password,
          checkPassword: CheckPasword,
          role: Role,
        };
        axios
        .post(`http://artpro.world:8080/api/v1/auth`, body)
        .then((response) => {
          if (response.status === 201) {
            dispatch(registerUser());
            console.log("회원 가입 성공!");
            navigate("/login");
          } else if (response.status === 400) {
        
            console.log(response);
            console.log("회원가입 실패");
          }
        })
        .catch((error) => {
            console.error("API 요청 중 오류가 발생하였습니다.", error);
            console.log(error);
           
        });
      }else{
        alert("비밀번호가 일치하지 않습니다.")};

      }
  


  return (
    <MainBackground>
        <Header/>
        <MainBox onSubmit={onSubmitHandler}>
            <Title>SIGN UP</Title>
            <WrapContent>
                <Input placeholder="닉네임을 입력해주세요" type="text" value={Name} onChange={onNameHandler}/>
                <Input placeholder="이메일을 입력해주세요" type="email" value={Email} onChange={onEmailHandler}/>
                <Input placeholder="비밀번호를 입력해주세요" type="password" value={Password} onChange={onPasswordHanlder}/>
                <Input placeholder="비밀번호를 다시 한번 입력해주세요" type="password" value={CheckPasword} onChange={onCheckPasswordHandler}/>
                <WrapRadioButton>
                    <RadioGroup>
                        <Radio id="artist" name="role" value="ROLE_ARTIST" defaultChecked >
                        Artist
                        </Radio>
                        <Radio id="producer" name="role" value="ROLE_PRODUCER" >
                        Producer
                        </Radio>
                    </RadioGroup>
                </WrapRadioButton>
                <SubmitButton
                    color = "white"
                    background="#333232"
                    width="8rem"
                    height="3rem"
                    name="Submit"
                    borderRadius="2rem" 
                    fontWeight={"bold"}
                    fontSize={"19px"}
                    marginTop={"1.5rem"}
                    borderStyle={"none"}
                    type="submit"
                />
               
        
            </WrapContent>    
        </MainBox>
    </MainBackground>
  );
}