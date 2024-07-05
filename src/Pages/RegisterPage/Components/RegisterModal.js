import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import { ReactComponent as Close } from "../../../Assets/close.svg";
import { ReactComponent as Profile } from "../../../Assets/Profile.svg";
import { ReactComponent as Check } from "../../../Assets/Check.svg";
import DropdownTag from "./DropdownTag";


function RegisterModal ({ show, onClose}) {
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [selectedTagKeyword, setSelectedTagKeyword] = useState("");

  useEffect(() => {
    if(show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);  

  const tagKeywords = ["기획·전략", "법무·사무·총무", "인사·HR", "마케팅·광고·MD","개발·데이터"];

  const toggleTag = () => setIsTagOpen(!isTagOpen);

  const handleTagSelect = (tagName) => {
    setSelectedTagKeyword(tagName);
};


if(!show) {
  return null;
}

  return (
    <Background>
      <OutContatiner>
        <StyledClose onClick={onClose}/>
          
        <Container>
          <StyledProfile />
          
          <UserDiv> 
            <UserDataDiv>
              <NameDiv>이름</NameDiv>
              <BoxDiv>
              <AnswerDiv name="userName" placeholder="홍길동"></AnswerDiv>
              </BoxDiv>
            </UserDataDiv>
            <UserDataDiv>
              <NameDiv>희망직군</NameDiv>
              <BoxDiv>
              <DropdownTag
                isOpen={isTagOpen}
                toggleDropdown={toggleTag}
                options={tagKeywords}
                onSelect={handleTagSelect}
              />
              </BoxDiv>
            </UserDataDiv>
          </UserDiv>
          

          <PolicyDiv>
            <PolicyDataDiv>
              <PolicyLeftDiv>
                <CheckboxDiv><StyledCheck/></CheckboxDiv>
                <PolicyNameDiv>이용약관 (필수)</PolicyNameDiv>
              </PolicyLeftDiv>
              <PolicyRightDiv>자세히 보기</PolicyRightDiv>
            </PolicyDataDiv>

            <PolicyDataDiv>
              <PolicyLeftDiv>
                <CheckboxDiv><StyledCheck/></CheckboxDiv>
                <PolicyNameDiv>개인정보 수집 및 이용 (필수)</PolicyNameDiv>
              </PolicyLeftDiv>
              <PolicyRightDiv>자세히 보기</PolicyRightDiv>
            </PolicyDataDiv>

          </PolicyDiv>

            <RegisterBtn>회원가입</RegisterBtn>
        </Container>
      </OutContatiner>
      </Background>
  );
}
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
`;

const OutContatiner =styled.div`
  
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // 중앙으로 배치하기 위해
  overflow-y: auto;

  width: 432px;
  height: 500px;
  flex-shrink: 0;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.White};
`;

const StyledClose =styled(Close)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 25px;
  left: 386px;
  flex-shrink: 0;
  cursor: pointer;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 51px;
  width: 330px;
  height: 500px;
  flex-shrink: 0;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  
`;

const StyledProfile =styled(Profile)`
  position: absolute;
  width: 125px;
  height: 125px;
  top: 40px;
  left: 103px;
  flex-shrink: 0;
`;

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position : absolute;
  top: 197px;
  width: 330px;
  height: 91px;
  
`;

const UserDataDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 330px;
  height: 35px;
`;

const NameDiv = styled.div`
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight : ${(props) => props.theme.fontWeights.TextM};
  align-items: center;
  
`;

const BoxDiv = styled.div`
  width: 228px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.Black};
`;

const AnswerDiv =styled.input`
  display: flex;
  width: 202px;
  height: 19px;
  margin-top: 8px;
  flex-shrink: 0;
  overflow-y: auto;
  resize: none;
  border: none;
  outline: none;
  max-width: 100%;
  max-height: 100%;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight : ${(props) => props.theme.fontWeights.TextM};
  text-align: start;
  &::placeholder {
    color: ${(props) => props.theme.colors.Gray};
  }
`;

const JobListBtn = styled.button`
`;

const PolicyDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position : absolute;
  top: 332px;
  width: 330px;
  height: 55px;
`;

const PolicyDataDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 330px;
  height: 20px;
`;

const PolicyLeftDiv = styled.div`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const CheckboxDiv = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 2px;
  border: 0.8px solid ${(props) => props.theme.colors.Black};
`;

const StyledCheck =styled(Check)`
  position: absolute;
  width: 12px;
  height: 9px;
  top: 5px;
  left: 4px;
  flex-shrink: 0;8
`;

const PolicyNameDiv = styled.div`
  margin-left: 10px;
  font-size: ${(props) => props.theme.fontSizes.TextS};
  font-weight : ${(props) => props.theme.fontWeights.TextS};
`;

const PolicyRightDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.TextS};
  font-weight : ${(props) => props.theme.fontWeights.TextS};
  color: ${(props) => props.theme.colors.Gray};;
`;


const RegisterBtn = styled.button`
  display: flex;
  width: 330px;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: ${(props) => props.theme.colors.Black};
  border-radius: 10px;

  position: absolute;
  top: 412px;
  color: ${(props) => props.theme.colors.White};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight : ${(props) => props.theme.fontWeights.TextM};
  line-height: normal;
`;


export default RegisterModal;