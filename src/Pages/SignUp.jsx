import React,{useState} from 'react';
import styled, {css} from 'styled-components';
import Header from '../Components/Header';
import SubmitButton from '../Components/Button';
import RadioGroup from '../Components/RadioGroup';
import Radio from '../Components/Radio';

const MainBackground = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
  background-color: black;
`;

const MainBox = styled.div`
  width: 60%;
  max-width: 800px;
  min-width: 480px;
  height: 80vh;
  max-height: 900px;
  min-height: 380px;
  position: absolute;
  margin-top: 320px;
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

const StyledLabel = styled.label`
    display: flex;
    align-items: center;

    :hover {
        cursor: pointer;
    }

    > span {
        min-width: fit-content;
        padding: 0;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.02em;
        color: grey;
    }
`

const StyledRadio = styled.input.attrs(() => ({
    type: 'radio',
})
)`   
    appearance: none;
    margin: 0 11px 0 0;
    width: 18px;
    height: 18px;
    border: 1.5px solid grey;
    border-radius: 50%;

    :hover {
        cursor: pointer;
    }

    :checked { 
        background: center url("사용할 svg 이미지의 data url") no-repeat;
        border: none;
        
        :disabled {
            background: center url("사용할 svg 이미지의 data url") no-repeat;
        }
    }

    :disabled {
        & + span {
            cursor: default;
        }

        :hover {
            cursor: default;
        }
    }

    :checked ~ span {
        color: #000000;
    }

    ${props => props.emphasis && css`
        ~ span:after {
            content: '*상담심리사 1급';
            margin-left: 7px;
            color: gray;
            font-weight: 400;
            font-size: 13px;
            line-height: 19px;
            letter-spacing: -0.02em;
        }
    `};
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


export default function SignUp() {
    const [value, setValue] = useState("EMAIL");
  return (
    <MainBackground>
        <Header/>
        <MainBox>
            <Title>SIGN UP</Title>
            <WrapContent>
                <Input placeholder="닉네임을 입력해주세요" type="text"/>
                <Input placeholder="이메일을 입력해주세요" type="email"/>
                <Input placeholder="비밀번호를 입력해주세요" type="password"/>
                <Input placeholder="비밀번호를 다시 한번 입력해주세요" type="password"/>
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
                />
                <WrapRadioButton>
                    <RadioGroup>
                        <Radio name="contact" value="Artist" defaultChecked>
                        Artist
                        </Radio>
                        <Radio name="contact" value="Producer">
                        Producer
                        </Radio>
                    </RadioGroup>
                </WrapRadioButton>
        
            </WrapContent>    
        </MainBox>
    </MainBackground>
  );
}
