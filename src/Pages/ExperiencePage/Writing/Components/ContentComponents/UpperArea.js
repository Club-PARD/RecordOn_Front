import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ProjectDateWrapper,
  ProjectDateStart,
} from "../../../../../Common/Calendar";
import { ko } from "date-fns/locale";
import { useRecoilState } from "recoil";
import {
  experienceState,
  handleExpRecordSubmit,
} from "../../../../../Atom/ExpRecordAtom";

const UppderArea = () => {
  // 리코일 변수
  const [experience, setExperience] = useRecoilState(experienceState);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );

  // 임시 변수
  const [expDate, setExpDate] = useState(new Date());
  const [expTitle, setExpTitle] = useState("");

  // 날짜 포맷
  const normalizeDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate;
  };

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
        exp_date: normalizeDate(expDate),
        title: expTitle,
      }));
    }
  }, [isExpRecordSubmitted, expDate, expTitle, setExperience]);

  // 달력 . 없이 입력 허용
  const handleRawChange = (event) => {
    const inputValue = event.target.value;
    // 입력값이 숫자 8자리인지 확인
    if (/^\d{8}$/.test(inputValue)) {
      // yyyyMMdd 형식을 yyyy.MM.dd 형식으로 변환
      const formattedDate = `${inputValue.slice(0, 4)}.${inputValue.slice(
        4,
        6
      )}.${inputValue.slice(6, 8)}`;
      event.target.value = formattedDate;
    }
  };

  return (
    <>
      {/* 상단 영역: 소제목, 경험한 날*/}
      <Upper>
        <UppderPart width={"840px"}>
          <StyledLabel>소제목</StyledLabel>
          <StyledInput
            type="text"
            placeholder="가장 기억에 남는 활동 중심으로 소제목을 작성해보세요! (15자 이내 공백 미포함)"
            onChange={handleTitleChange}
          />
        </UppderPart>

        <UppderPart width={"227px"}>
          <StyledLabel>경험한 날</StyledLabel>
          <ProjectDateWrapper>
            <ProjectDateStart
              calWidth={"126px"}
              dateFormat="yyyy.MM.dd"
              shouldCloseOnSelect
              disabledKeyboardNavigation
              minDate={new Date("1980-01-01")}
              maxDate={new Date("2100-12-31")}
              locale={ko}
              selected={expDate}
              onChange={handleDateChange}
              onChangeRaw={handleRawChange}
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

  background-color: ${(props) => props.theme.color.base2};
  border-radius: 5px;

  font-weight: ${(props) => props.theme.fontWeights.TextL};
  font-size: ${(props) => props.theme.fontSizes.TextL};
  &::placeholder {
    font-weight: ${(props) => props.theme.fontWeights.TextL};
    font-size: ${(props) => props.theme.fontSizes.TextL};
    color: ${(props) => props.theme.color.base6};
  }
`;

export default UppderArea;
export { Upper, UppderPart, StyledLabel, StyledInput };
