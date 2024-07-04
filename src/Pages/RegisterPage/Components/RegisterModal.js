
import styled from "styled-components";
import close from "../../Assets/close.svg";


  return (

      <OutContatiner>
        <CloseDiv onClick={closeModal}>
          <img src={close} alt="닫힘 아이콘"></img>
        </CloseDiv>
        <Container>
          <RealTopDiv>
            
          </RealTopDiv>
          <Title type="text" name="letterTitle" placeholder="제목" value={writings.letterTitle} onChange={handleWritingInput} ref={titlefocus} autoComplete="off"></Title>
          <FreeContents name="letterContents" placeholder="오늘 하루 어땠는지, 가족에게 나누어 주세요! " value={writings.letterContents} onChange={handleWritingInput} autoComplete="off" ref={contentInput}></FreeContents>

          <QuestionDiv> 
            <QuestionRandomDiv>
              <Qdiv>Q. {letter[0]}</Qdiv>
              <AnswerDiv name="questionAnswer1" placeholder="답변을 작성해주세요..." value={writings.questionAnswer1} onChange={handleWritingInput} autoComplete="off" ref={questionAnswer1}></AnswerDiv>
            </QuestionRandomDiv>
            <QuestionRandomDiv>
              <Qdiv>Q. {letter[1]}</Qdiv>
              <AnswerDiv name="questionAnswer2" placeholder="답변을 작성해주세요..." value={writings.questionAnswer2} onChange={handleWritingInput} autoComplete="off" ref={questionAnswer2}></AnswerDiv>
            </QuestionRandomDiv>
          </QuestionDiv>
          
          <BtnContainer>
            <AddButton >작성완료</AddButton>
          </BtnContainer>
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

const CloseDiv =styled.div`
  justify-content: center;
  align-items: center;
  position: absolute;
  
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  background-color: #fff;
  max-width: 100%;
  max-height: 90%;
  overflow-y: auto;
  border-radius: 50%;
  cursor: pointer;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 40px;
  left: 51px;
  width: 330px;
  height: 412px;
  flex-shrink: 0;
  max-width: 100%;
  max-height: 90%;
  overflow-y: auto;
`;

const RealTopDiv =styled.div`
  display: flex;
  margin-top: 34px;
  align-items: start;
  width: 870px;
`;

const EmotionDiv =styled.div`
  display: inline-flex;
  height: 27px;
  padding: 0px 8px;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--blueblack-1, #34334A);
  height: 27px;
  /* margin-left: 40px; */
`;

const Talkimg =styled.img`
  width: 273px;
  height: 27px;
  margin-left: 10px;
  position: relative;
`;

const Talk =styled.div`
  position: absolute;
  color: var(--black, #161616);
font-family: Pretendard;
font-size: 11.896px;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: -0.036px;
left: 18%;
top: 6.6%;
`;

const TopDiv =styled.input`

  margin-bottom: 37px;
  margin-left: 391.91px;
  color:  #161616;
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  /* margin-left: 768px; */
  border: none;
  background-color: #F8FFA6;
  border: none;
  width: 92px;
  height: 19px;
  outline: none;
`;

const Title = styled.input`
  color: white;
  font-size: 25px;
  text-align: center;
  margin-bottom: 16px;
  width: 870px;
  height: 48px;
  flex-shrink: 0;
  text-align: start;
  border: none;

  background-color: #F8FFA6;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: black;
  outline: none;

  &::placeholder {
    color: #B7BC88;
  }

`;


const FreeContents =styled.textarea`
  width: 870px;
  height: 146px;
  flex-shrink: 0;
  color: #F8FFA6;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  resize: none;

  background-color: #F8FFA6;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #161616;
  text-align: start;
  border: none;
  outline: none;

  &::placeholder {
    color: #B7BC88;
  }
`;

const QuestionDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const QuestionRandomDiv =styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 427px;
  height: 191px;
  flex-shrink: 0;
  border-radius: 20px;
  background-color: #FDFED6;
`;

const Qdiv = styled.div`
  width: 395px;
  margin-top: 16px;
`;

const AnswerDiv =styled.textarea`
  width: 395px;
  height: 128px;
  flex-shrink: 0;
  color: #676767;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: #FDFED6;
  margin-top: 12px;
  resize: none;
  border: none;
  outline: none;

  &::placeholder {
    color: #9D9D9D;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AddButton = styled.button`
  display: flex;
  width: 220px;
  height: 60px;
  padding: 21px 75px 20px 75px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 20px 10px 20px 10px;
  border-radius: 8px;
  background: var(--blueblack-1, #34334A);

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &:hover {
    cursor: pointer;
  }
`;

export default WritingModal;