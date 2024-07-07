import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ProjectDateWrapper,
  ProjectDateStart,
} from "../../../../Common/Calendar";
import { ko } from "date-fns/locale";
import { useRecoilState } from "recoil";
import {
  experienceState,
  handleExpRecordSubmit,
} from "../../../../Atom/ExpRecordAtom";

const UppderArea = () => {
  const [experience, setExperience] = useRecoilState(experienceState);
  const [expDate, setExpDate] = useState(new Date());
  const [expTitle, setExpTitle] = useState("");

  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );

  // 입력 내용을 임시 변수에 관리
  const handleDateChange = (date) => {
    setExpDate(date);
  };
  const handleTitleChange = (e) => {
    setExpTitle(e.target.value);
  };

  // 상위 컴포넌트에서 버튼 선택된 경우 리코일에 값을 할당
  useEffect(() => {
    if (isExpRecordSubmitted) {
      setExperience((prev) => ({
        ...prev,
        exp_date: expDate,
        exp_title: expTitle,
      }));
    }
  }, [isExpRecordSubmitted]);

  return (
    <>
      {/* 상단 영역: 소제목, 경험한 날*/}
      <Upper>
        <UppderPart width={"840px"}>
          <StyledLabel>소제목</StyledLabel>
          <StyledInput
            type="text"
            placeholder="오늘의 프로젝트 경험은 어땠나요~?"
            onChange={handleTitleChange}
          />
        </UppderPart>

        <UppderPart width={"227px"}>
          <StyledLabel>경험한 날</StyledLabel>
          <ProjectDateWrapper>
            <ProjectDateStart calWidth={"126px"}
              dateFormat="yyyy.MM.dd"
              shouldCloseOnSelect
              disabledKeyboardNavigation
              minDate={new Date("1980-01-01")}
              maxDate={new Date("2100-12-31")}
              locale={ko}
              selected={expDate}
              onChange={handleDateChange}
            />
          </ProjectDateWrapper>
        </UppderPart>
      </Upper>
    </>
  );
};

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin-top: 153px;
  margin-bottom: 70px;
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

const StyledInput = styled.input`
  box-sizing: border-box;
  padding-left: 25px;

  width: 740px;
  height: 50px;

  background-color: ${(props) => props.theme.colors.BoxGray};
  border-radius: 5px;

  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};
  &::placeholder {
    font-weight: ${(props) => props.theme.fontWeights.TextL};
    font-size: ${(props) => props.theme.fontSizes.TextL};
    color: ${(props) => props.theme.colors.Charcoal};
  }
`;

export default UppderArea;
