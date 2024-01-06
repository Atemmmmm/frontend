import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';

const MainBackground = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
  background-color: black;
  pointer-events: none;
`;

const Menu = styled.div`
  height: 50px;
  font-size: 20px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 0px;
  margin-top: 20vh;
  color: black;
  align-item: left;
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

const AbBox = styled.div`
  width: 10%;
  display: flex;
  align-items: center;

`;

export default function Main() {
  return (
    <MainBackground>
      <h1>"Feed" </h1>
        <Header/>
          <Menu>
            
            "Artist"
            "Producer"
          </Menu>

            <WrapContent>
                <AbBox
                    color = "white"
                    background="#333232"
                    width="8rem"
                    height="3rem"
                    fontWeight={"bold"}
                    fontSize={"15px"}
                    marginTop={"1.5rem"}
                    borderStyle={"none"}
                />  
              </WrapContent>
      </MainBackground>
  )
} 