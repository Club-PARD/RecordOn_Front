import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { ReactComponent as Close } from "../../../../Assets/close.svg";
import CheckboxGrid from './CheckBoxGrid';


function ProjectEndModal ({ show, onClose}) {


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

if(!show) {
  return null;
}

  return (
    <Background>
      <OutContatiner>
        <StyledClose onClick={onClose}/>
          
        <Container>
          <TitleDiv>축하합니다!<br />프로젝트가 완성되었습니다.</TitleDiv>
          <MarginUnderTitle/>
          <CaptionDiv>해당 프로젝트 내에서 가장 돋보였던 핵심역량을 최대 3개 체크해주세요.</CaptionDiv>
          <MarginAboutTag/>
          <CheckboxGrid></CheckboxGrid>
            {/* <RegisterBtn onClick={handleSubmit}>프로젝트 완료</RegisterBtn> */}
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
  height: 400px;
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
  z-index: 99998
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 432px;
  height: 400px;
  flex-shrink: 0;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  
`;

const TitleDiv = styled.div`
width: 301px;
height: 60.904px;
position: absolute;
top: 56px;
flex-shrink: 0;
text-align: center;
color: ${(props) => props.theme.color.Black};
font-size: ${(props) => props.theme.fontSizes.TextXL};
font-weight : ${(props) => props.theme.fontWeights.TextXL};
line-height: 130%; /* 31.2px */
letter-spacing: -0.48px;
`;

const CaptionDiv = styled.div`
display: flex;
position: absolute;
top: 124.27px;
width: 432px;
height: 20px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
text-align: center;
color: ${(props) => props.theme.color.Black};

font-size: ${(props) => props.theme.fontSizes.Caption};
font-weight : ${(props) => props.theme.fontWeights.Caption};
line-height: 130%;
letter-spacing: -0.24px;
`;

// const SelectTag = styled.div`
//   display: flex;
// width: 230px;
// height: 109px;
// justify-content: center;
// align-items: center;
// align-content: center;


// `;

const RegisterBtn = styled.button`
  display: flex;
  width: 180px;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: ${(props) => props.theme.color.base6};
  border-radius: 10px;

  position: absolute;
  top: 303.37px;
  color: ${(props) => props.theme.colors.White};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight : ${(props) => props.theme.fontWeights.TextM};
  line-height: normal;
`;
const MarginUnderTitle = styled.div`
width: 432px;
height: 7.37px;

background-color: ${(props) => props.theme.colors.White};
`;

const MarginAboutTag = styled.div`
width: 432px;
height: 25px;

background-color: ${(props) => props.theme.colors.White};
`;

export default ProjectEndModal;