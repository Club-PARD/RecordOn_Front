import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  FixArea,
  FixAreaLabel,
} from "../Components/ContentComponents/LowerArea";

const UpperArea = ({ answerObject }) => {
  const keywords = [
    { id: 0, label: "도전", color: "#2ABCDC" },
    { id: 1, label: "어려움", color: "#FF971D" },
    { id: 2, label: "성공", color: "#4B9EFF" },
    { id: 3, label: "실패", color: "#F25454" },
    { id: 4, label: "배움", color: "#42B887" },
  ];

  const [formattedExpDate, setFormattedExpDate] = useState("");
  useEffect(() => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}`;
    };

    if (answerObject.exp_date) {
      const originalDate = answerObject.exp_date;
      const formattedDate = formatDate(originalDate);
      setFormattedExpDate(formattedDate);
    }
  }, [answerObject]);

  return (
    <>
      {/* 상단 영역: 소제목, 경험한 날*/}
      <Upper>
        <UppderPart width={"840px"}>
          <StyledLabel>소제목</StyledLabel>
          <StyledTitle>{answerObject.experience_name}</StyledTitle>
        </UppderPart>

        <UppderPart width={"713px"}>
          <StyledLabel>경험태그</StyledLabel>
          <StyledTagArea>
            {answerObject.tag_id && answerObject.tag_id.map((tagId, index) => {
              const keyword = keywords.find(k => k.id +1 === tagId);
              return (
                <StyledTag
                  key={index}
                  borderColor={keyword ? keyword.color : "#000"}
                  color = {keyword ? keyword.color: "#000"}
                >
                  {keyword ? keyword.label : ""}
                </StyledTag>
              );
            })}
          </StyledTagArea>
        </UppderPart>

        <UppderPart width={"239px"}>
          <StyledLabel>경험한 날</StyledLabel>
          <StyledDate>{formattedExpDate}</StyledDate>
        </UppderPart>
      </Upper>

      <FixArea>
        <FixAreaLabel>
          Q. 오늘 있었던 경험을 떠올리며, 연상되는 다섯 가지 단어를 적어보세요!
        </FixAreaLabel>
        <FixAnswer>{answerObject.common_question_answer}</FixAnswer>
      </FixArea>
    </>
  );
};

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin-top: 153px;
  margin-bottom: 69px;
`;

const UppderPart = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  justify-content: space-between;

  width: ${({ width }) => width};
`;

const StyledLabel = styled.label`
  box-sizing: border-box;

  white-space: nowrap;
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};
`;

const StyledTagArea = styled.div`
  flex-direction: row;
  align-items: flex-start;

  width: 610px;
  gap: 10px;
`;

const StyledTag = styled.div`
  justify-content: center;

  width: 114px;
  height: 40px;

  border-radius: 25px;

  border: 1.5px solid ${(props) => props.borderColor};
  color: ${(props) => props.color};

  font-size: ${(props) => props.theme.fontSizes.TextL};
  font-weight: ${(props) => props.theme.fontWeights.TitleL};
  background-color: ${(props) => props.theme.color.white};
`;

const StyledTitle = styled.div`
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  padding-left: 25px;

  width: 740px;
  height: 50px;

  background-color: ${(props) => props.theme.color.base2};
  border-radius: 5px;

  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};
`;

const StyledDate = styled.div`
  justify-content: center;
  width: 136px;
  height: 40px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.color.base2};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  font-size: ${(props) => props.theme.fontSizes.TextM};
`;

const FixAnswer = styled.div`
  align-items: flex-start;

  width: 792px;
  height: 74px;

  font-weight: ${(props) => props.theme.fontWeights.TextM};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  color: ${(props) => props.theme.color.black};

  margin-top: 2px;
`;
export default UpperArea;
export { StyledTag, FixAreaLabel };
