import React from 'react';
import styled from 'styled-components';
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
  font-size: 30pt;
  float: left;
  color: white;
  margin-left: 0px;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Title>ArtPro</Title>
      <Link to="/SignUp">
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
        </Link>
    </HeaderWrapper>
  );
}