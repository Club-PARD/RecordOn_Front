import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { handleRegisterDataSubmit } from "../../../Atom/RegisterDataAtom.js";
import { ReactComponent as Close } from "../../../Assets/close.svg";
import { ReactComponent as Profile } from "../../../Assets/Profile.svg";
import DropdownJob from "./DropdownJob";
import CheckBox from './CheckBox';
import CheckBox2 from './CheckBox2';

function RegisterModal ({ show, onClose}) {
  const [isRegisterDataSubmitted, setIsRegisterDataSubmitted] = useRecoilState(
    handleRegisterDataSubmit
  );

  const handleSubmit = () => {
    setIsRegisterDataSubmitted(true);
    //console.log(`Job selected: ${Job`);
  };

  const [selectedJobKeyword, setSelectedJobKeyword] = useState("");

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

  const jobKeywords = ["기획·전략", "법무·사무·총무", "인사·HR", "마케팅·광고·MD","개발·데이터","디자인" ,"물류·무역" ,"영업" ,"식·음료", "엔지니어링·설계", "제조·생산", "교육", "건축·시설","의료·바이오"];


  const handleJobSelect = (JobName) => {
    setSelectedJobKeyword(JobName);
    console.log(`Job selected: ${JobName}`);
};

const [isBox1Checked, setIsBox1Checked] = useState(false);
const [isBox2Checked, setIsBox2Checked] = useState(false);
const isFormValid = (isBox1Checked == false) && (isBox2Checked== false);

if(!show) {
  return null;
}

// //버튼 활성화
// // 모든 input의 value가 1자 이상이 되어야 한다
// const isValidInput = userName.length >= 1;

// // 검사한 모든 로직의 유효성 검사가 true가 될때 getIsActive함수가 작동한다. 버튼 클릭 이벤트가 발생할때 넣어줄 함수.
// const getIsActive = 
//    isValidEmail && isValidPassword && isValidInput && checkBoxActive === true;

// // 유효성 검사 중 하나라도 만족하지못할때 즉, 버튼이 비활성화 될 때 버튼을 클릭하면 아래와 같은 경고창이 뜬다.
// const handleButtomValid = () => {
//  if (
//    !isValidInput ||
//    !isValidEmail ||
//    !isValidPassword ||
//    !isCheckBoxClicked()
//    ) {
//    alert('please fill in the blanks');
// }};

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
              <DropdownJob
                options={jobKeywords}
                onSelect={(JobName) =>
                  handleJobSelect(JobName)
              }
              />
              </BoxDiv>
            </UserDataDiv>
          </UserDiv>
          

          <PolicyDiv>
            <PolicyDataDiv>
              <PolicyLeftDiv>
                <CheckBox id ="termsOfService" onSelect={isBox1Checked}/>
                <PolicyNameDiv>이용약관 (필수)</PolicyNameDiv>
              </PolicyLeftDiv>
              <PolicyRightDiv>자세히 보기</PolicyRightDiv>
            </PolicyDataDiv>

            <PolicyDataDiv>
              <PolicyLeftDiv>
              <CheckBox id ="privacyPolicy" onSelect={isBox2Checked}/>
                <PolicyNameDiv>개인정보 수집 및 이용 (필수)</PolicyNameDiv>
              </PolicyLeftDiv>
              <PolicyRightDiv>자세히 보기</PolicyRightDiv>
            </PolicyDataDiv>

          </PolicyDiv>

            <RegisterBtn onClick={handleSubmit} disabled={!isFormValid}>회원가입</RegisterBtn>
        </Container>
      </OutContatiner>
      </Background>
  );
};
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(18, 18, 18, 0.40);
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

const PolicyNameDiv = styled.div`
  position: absolute;
  margin-left: 30px;
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
  background: ${(props) => props.theme.color.main};
  border-radius: 10px;

  position: absolute;
  top: 412px;
  color: ${(props) => props.theme.colors.White};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight : ${(props) => props.theme.fontWeights.TextM};
  line-height: normal;

  &:disabled {
    background: ${(props) => props.theme.colors.Gray};
    cursor: not-allowed;
  }
`;


export default RegisterModal;