import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ProjectDateWrapper,
  ProjectDateStart,
} from "../../../../../Common/Calendar";
import { ko } from "date-fns/locale";
import { useRecoilState } from "recoil";
import {
  answerState,
  handleExpRecordEditSubmit,
  isValidState,
  isAllValidState,
  tempInputState,
} from "../../../../../Atom/ExpRecordAtom";

const UppderArea = () => {
  const [answer, setAnswer] = useRecoilState(answerState);
  const [tempInput, setTempInput] = useRecoilState(tempInputState);
  const [expDate, setExpDate] = useState(new Date());
  const [expTitle, setExpTitle] = useState("");

  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordEditSubmit
  );
  const [isValid, setIsValid] = useRecoilState(isValidState);
  const [isAllValid, setIsAllValid] = useRecoilState(isAllValidState);

  // 서버에서 초기값 설정
  useEffect(() => {
    if (answer) {
      setExpDate(new Date(answer.exp_date));
      setExpTitle(answer.title || "");
    }
  }, [answer]);

  // 날짜 포맷
  const normalizeDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate;
  };

  // 입력 내용을 임시 변수에 관리
  const handleDateChange = (date) => {
    setExpDate(date);
    setTempInput({
      ...tempInput,
      exp_date: date,
    })
  };

  const handleTitleChange = (e) => {
    setExpTitle(e.target.value);
    setTempInput({
      ...tempInput,
      title: e.target.value,
    })
  };
  console.log("expTitle", expTitle);
  console.log("tempInput", tempInput);

  // 상위 컴포넌트에서 버튼 선택된 경우 리코일에 값을 할당
  // useEffect(() => {
  //   if (isExpRecordSubmitted) {
  //     if (expDate == null || expTitle == null || expTitle.trim() === "") {
  //       setIsValid((prevState) => ({
  //         ...prevState,
  //         upper: false,
  //       }));
  //     }
  //   }
  // }, [isExpRecordSubmitted, expDate, expTitle, setAnswer]);

  // useEffect(() => {
  //   const normalizedExpDate = normalizeDate(expDate);
  //   setAnswer((prev) => ({
  //     ...prev,
  //     exp_date: normalizedExpDate,
  //     title: expTitle,
  //   }));
  // }, [isAllValid]);

  console.log ("answeR: ", answer)
  return (
    <>
      {/* 상단 영역: 소제목, 경험한 날*/}
      <Upper>
        <UppderPart width={"840px"}>
          <StyledLabel>
            소제목<Asterisk>*</Asterisk>
          </StyledLabel>
          <StyledInput
            type="text"
            // value={expTitle}
            defaultValue={answer?.title}
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
const Asterisk = styled.div`
  width: 10px;
  height: 23px;
  color: ${(props) => props.theme.color.fail};
  justify-content: center;
  margin-left: 2px;
`;

export default UppderArea;
export { Upper, UppderPart, StyledLabel, StyledInput };
