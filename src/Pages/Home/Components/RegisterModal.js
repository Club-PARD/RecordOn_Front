import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { handleRegisterDataSubmit } from "../../../Atom/RegisterDataAtom.js";
import { isLogined, recoilLoginData, recoilUserData } from "../../../Atom/UserDataAtom.js"
import { ReactComponent as Close } from "../../../Assets/close.svg";
import Check from "../../../Assets/Check.svg";
import { ReactComponent as Profile } from "../../../Assets/Profile.svg";
import DropdownJob from "./DropdownJob.js";
import { registerUserAPI } from '../../../Axios/RegisterApi.js'
import { useNavigate } from 'react-router-dom';
import PrivacyPolicyModal from './PrivacyPolicyModal.js';
import ServicePolicyModal from './ServicePolicyModal.js';



function RegisterModal({ show, onClose, defaultName }) {
  const [isRegisterDataSubmitted, setIsRegisterDataSubmitted] = useRecoilState(
    handleRegisterDataSubmit
  );

  const [loginData, setLoginData] = useRecoilState(recoilLoginData);
  const [userData, setUserData] = useRecoilState(recoilUserData);
  const [registerData, setRegisterData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLogined);
  const navigate = useNavigate();

  //약관 모달
  //약관 모달 출력 관련 함수 시작
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const openPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
    console.log(isPrivacyModalOpen);
  };
  const closePrivacyModal = () => setIsPrivacyModalOpen(false);


  const openServiceModal = () => {
    setIsServiceModalOpen(true);
    console.log(isServiceModalOpen);
  };
  const closeServiceModal = () => setIsServiceModalOpen(false);
  //약관 모달 출력 관련 함수 끝

  

  const handleSubmit = async () => {
    // setIsRegisterDataSubmitted(true);
    const response = await registerUserAPI(registerData);
    console.log(response);
    setIsLoggedIn(true);
    // navigate("/project");
  };
  useEffect(() => {
    setRegisterData({
      ...registerData,
      name: loginData.name,
      id: userData.user_id,
    })
  }, [userData])

  console.log(registerData);

  const [selectedJobKeyword, setSelectedJobKeyword] = useState("");

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  const jobKeywords = ["기획·전략", "법무·사무·총무", "인사·HR", "마케팅·광고·MD", "개발·데이터", "디자인", "물류·무역", "영업", "식·음료", "엔지니어링·설계", "제조·생산", "교육", "건축·시설", "의료·바이오"];

  const handleNameInput = (e) => {
    setRegisterData({
      ...registerData,
      name: e.target.value,
    })
  };

  const handleJobSelect = (JobName) => {
    setRegisterData({
      ...registerData,
      job: JobName,
    })
    setSelectedJobKeyword(JobName);
  };



  const [isBox1Checked, setIsBox1Checked] = useState(false);
  const [isBox2Checked, setIsBox2Checked] = useState(false);
  const isFormValid = (isBox1Checked) && (isBox2Checked) && (selectedJobKeyword !== "");

  if (!show) {
    return null;
  }
  console.log(isBox1Checked);
  console.log(isBox2Checked);
  console.log(isFormValid);
  const box1Checking = () => {
    setIsBox1Checked((prev) => (!prev));
    console.log(isBox1Checked);
  }

  const box2Checking = () => {
    setIsBox2Checked((prev) => (!prev));
    console.log(isBox2Checked);
  }

  return (
    <Background>
      <OutContainer>
        <StyledClose onClick={onClose} />

        <Container>
          <StyledProfile src={loginData.imageUrl} />

          <UserDiv>
            <UserDataDiv>
              <NameDiv>이름</NameDiv>
              <BoxDiv>
                <AnswerDiv type='text' id="userName" defaultValue={loginData.name} onChange={handleNameInput}  ></AnswerDiv>
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
              <PolicyLeftDiv >
                <CheckboxDiv >
                  <Checkbox type='checkbox' checked={isBox1Checked} onChange={() => { setIsBox1Checked((prev) => !prev) }} />
                  {isBox1Checked && <img src={Check} style={{ position: "fixed", justifyContent: "center", marginTop: "4px", cursor: "pointer"}} onClick={box1Checking} />}
                </CheckboxDiv>
                <PolicyNameDiv>이용약관 (필수)</PolicyNameDiv>
              </PolicyLeftDiv>
              <PolicyRightDiv onClick={openPrivacyModal}>자세히 보기</PolicyRightDiv>
            </PolicyDataDiv>

            <PolicyDataDiv>
              <PolicyLeftDiv>
                <CheckboxDiv >
                  <Checkbox type='checkbox' checked={isBox2Checked} onChange={() => { setIsBox2Checked((prev) => !prev) }} />
                  {isBox2Checked && <img src={Check} style={{ position: "fixed", justifyContent: "center", marginTop: "4px", cursor: "pointer" }} onClick={box2Checking} />}
                </CheckboxDiv>
                <PolicyNameDiv>개인정보 수집 및 이용 (필수)</PolicyNameDiv>
              </PolicyLeftDiv>
              <PolicyRightDiv onClick={openServiceModal}>자세히 보기</PolicyRightDiv>
            </PolicyDataDiv>

          </PolicyDiv>

          <RegisterBtn onClick={handleSubmit} disabled={!isFormValid}>회원가입</RegisterBtn>
        </Container>
      </OutContainer>
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={closePrivacyModal} />
      <ServicePolicyModal isOpen={isServiceModalOpen} onClose={closeServiceModal} />
    </Background >
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

const OutContainer = styled.div`
  
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

const StyledClose = styled(Close)`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 25px;
  left: 386px;
  flex-shrink: 0;
  cursor: pointer;
`;

const Container = styled.div`
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

const StyledProfile = styled.img`
  position: absolute;
  width: 125px;
  height: 125px;
  top: 40px;
  left: 103px;
  flex-shrink: 0;
  /* border: 1px solid black; */
  border-radius: 65px;
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
  /* border: 1px solid ${(props) => props.theme.colors.Black}; */
  background-color: ${(props) => props.theme.color.base2};
`;

const AnswerDiv = styled.input`
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
width: 208px;
height: 20px;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
`;

const CheckboxDiv = styled.div`
  /* width: 20px;
  height: 20px; */
  justify-content: space-between;
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border: 0.8px solid black;
  border-radius: 2px;
  cursor: pointer;
`;

const PolicyNameDiv = styled.div`
width: 178px;
height: 20px;
margin-left: 10px;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight : ${(props) => props.theme.fontWeights.TextS};
/* border: 1px solid black; */
align-items: start;
`;

const PolicyRightDiv = styled.div`
display: flex;
align-items: center;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight : ${(props) => props.theme.fontWeights.TextS};
color: ${(props) => props.theme.colors.Gray};
cursor: pointer;
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