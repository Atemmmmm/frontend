import React, {useState, useRef, useEffect} from 'react';
import styled,{css} from 'styled-components';
import {Link, useNavigate} from "react-router-dom";
import JoinButton from './Button';
import UserButton from './Button';
import axios from 'axios';
import { LOGOUT_USER } from '../_actions/types';
import { logoutUser } from '../_actions/user_action';
import { useDispatch } from "react-redux";
import token from '../Pages/Login';
import {useSelector} from 'react-redux';

const HeaderWrapper = styled.div`
  position: fiexd;
  display: flex;
  height: 5rem;
  align-items: center;
  width: 100%;    
  justify-content: space-between;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: bolder;
  font-size: 35pt;
  float: left;
  color: white;
  margin-top: 40px;
  margin-left: 40px;
  font-family: 'Kavoon', serif;
`;

const ButtonWrap = styled.div`
  margin-right: 40px;
`

const useDetectClose = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef(null);

  const removeHandler = () => {
    setIsOpen(!isOpen);
  };
  

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen]);

  return [isOpen, ref, removeHandler];
};


const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
`;

const Menu = styled.div`
  background: gray;
  position: absolute;
  top: 50px;
  left: 50%;
  width: 100px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20%);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
  cursor: pointer;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li``;

const LinkWrapper = styled.a`
  font-size: 18px;
  text-decoration: none;
  color: white;
`;


export default function Header() {
  const [DropIsOpen, DropRef, DropHandler] = useDetectClose(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
      const token = localStorage.getItem("accessToken");
    // token이 없을 때
    if (!token) {
      alert("사용자가 아닙니다.");
      return;
    }
      axios.get("http://artpro.world:8080/api/v1/members", 
        {
        	headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) =>{
        setRole(res.data.role);
        setName(res.data.nickname)
      

      }).catch((err) => {
        console.log(err)
      
      })
    }
  }, []);



  const logoutClickHandler = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      dispatch(logoutUser());
      alert("로그아웃되었습니다.");
      navigate("/");
  
  };
  const JoinClickHandler = () =>{
    navigate("/SignUp");
    setIsLoggedIn(false);
  }

    
  

  return (
    <HeaderWrapper>
      <Link to='/'>
        <Title>ArtPro</Title>
      </Link>
      <ButtonWrap>
      {isLoggedIn && 
                      <UserButton
                      color = "white"
                      background="#333232"
                      width="fit-content"
                      height="2.5rem"
                      name={role +" "+ name}
                      borderRadius="2rem" 
                      fontSize={"21px"}
                      borderStyle={"none"}
                      onClick={DropHandler} 
                      ref={DropRef}/>}
       

      <DropdownContainer>
      {!isLoggedIn && <JoinButton
                      color = "white"
                      background="#333232"
                      width="5rem"
                      height="2.5rem"
                      name="JOIN"
                      borderRadius="2rem" 
                      fontSize={"21px"}
                      borderStyle={"none"}
                      onClick={JoinClickHandler}/>}
      
        <Menu isDropped={DropIsOpen}>
          <Ul>
            <Li>
              <LinkWrapper href="/Upload">Upload</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper href="/MyPage">My Feed</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper href="/Chat">Chat</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper onClick={() => {logoutClickHandler(); 
                                            DropHandler();}}>Logout</LinkWrapper>
            </Li>
          </Ul>
        </Menu>
        </DropdownContainer>
        </ButtonWrap> 
    </HeaderWrapper>
  );
}