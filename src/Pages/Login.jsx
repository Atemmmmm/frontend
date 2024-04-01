import React, {useState} from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import LoginButton from '../Components/Button';
import { useNavigate, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_action";
import axios from 'axios';
import Auth from "../hoc/auth";
import '../App.css';

const MainBackground = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
`;

const MainBox = styled.form`
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


export default function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    //로그인을 진행하기위해서
    //첫번째 useDispatch(액션) 을 활용해서 액션을 dispatch해준다
    const body = {
      email: Email,
      password: Password,
    };

    axios
    .post("http://artpro.world:8080/api/v1/members", body)
    .then((response) => {
      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("id", token);
        dispatch(loginUser());
        console.log("로그인 성공!");
        navigate("/feed");
      } else if (response.status === 400) {
        // 로그인 실패했을 때 추가
        console.log(response);
        console.log("로그인 실패");
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log("로그인 실패");
        alert(error.response.data.error);
      } else {
        // 서버 응답이 없는 경우 (네트워크 오류 등)
        console.error("API 요청 중 오류가 발생하였습니다.", error);
        // console.log(error);
        // console.log(formData);
      }
    });
  
  };

  return (
    <MainBackground>
        <Header/>
       
        <MainBox onSubmit={onSubmitHandler}>
            <Title>LOGIN</Title>
            <WrapContent>
                <Input placeholder="이메일을 입력해주세요" type="email" value={Email} onChange={onEmailHandler}/>

                <Input placeholder="비밀번호를 입력해주세요" type="password" value={Password} onChange={onPasswordHanlder} />

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
                    type="submit"
                />
        
            </WrapContent>    
        </MainBox>
    </MainBackground>
  );
}

