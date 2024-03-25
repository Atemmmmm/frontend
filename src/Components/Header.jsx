import React, {useState, useRef, useEffect} from 'react';
import styled,{css} from 'styled-components';
import {Link} from "react-router-dom";
import JoinButton from './Button';

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 2 rem;
  align-items: center;
  justify-content: center;
  display: fixed;
  padding: 0 2rem;

  justify-content: space-between;
  align-items:center;
  
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: bolder;
  font-size: 35pt;
  float: left;
  color: white;
  margin-top: 40px;
  margin-left: 0px;
  font-family: 'Kavoon', serif;
`;

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


export const OptionsData = [
  {key: "Upload", value: "Upload"}, 
  {key: "MyPage", value: "MyPage"},
  {key: "Feed", value: "Feed"}, 
  {key: "Chat", value: "Chat"},
  {key: "Logout", value: "Logout"}
];

const Menu = styled.div`
  background: gray;
  position: absolute;
  top: 52px;
  left: 50%;
  right: 10px;
  width: 100px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

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
  font-size: 16px;
  text-decoration: none;
  color: white;
`;

const Logout = styled.div`
  cursor: pointer;
  font-size: 16px;
  display: block;
  text-decoration: none;
  color: white;
  font-size: 19px;
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
`;

export default function Header() {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const [boardIsOpen, boardRef, boardHandler] = useDetectClose(false);

  const logoutClickHandler = () => {
    console.log("logout");
  };

  return (
    <HeaderWrapper>
      <Title>ArtPro</Title>
      <DropdownContainer>
      <Link>
        <JoinButton
                    color = "white"
                    background="#333232"
                    width="5rem"
                    height="2rem"
                    name="JOIN"
                    borderRadius="2rem" 
                    fontSize={"20px"}
                    borderStyle={"none"}
                    marginTop={"20px"}
                    marginLeft={"75%"}
                />
                    onClick={myPageHandler} ref={myPageRef}
          />
        </Link>
        <Menu isDropped={myPageIsOpen}>
          <Ul>
            <Li>
              <LinkWrapper href="/Update">Upload</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper href="/MyPage">MyFeed</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper href="/Chat">Chat</LinkWrapper>
            </Li>
            <Li>
              <LinkWrapper href="Logout">Logout</LinkWrapper>
            </Li>
          </Ul>
        </Menu>
        </DropdownContainer>
    </HeaderWrapper>
  );
}