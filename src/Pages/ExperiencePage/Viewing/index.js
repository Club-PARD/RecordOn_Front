import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getOneExperienceAPI,
  deleteOneExperienceAPI,
} from "../../../Axios/ExperienceApi";

import { useRecoilState } from "recoil";
import { answerState, tempInputState } from "../../../Atom/ExpRecordAtom";
import { recoilSnack, recoilUserData } from "../../../Atom/UserDataAtom";

import UpperArea, { StyledTag, FixAreaLabel } from "./Components/UpperArea";
import {
  Div,
  GoBackArea,
  MarginTopForGoBackDiv,
  MarginBottomForGoBackDiv,
  GoBackDiv,
  GoBackIcon,
} from "../Writing/index";
import Bookmark from "../Writing/Components/ContentComponents/LowerComponents/Bookmark";
import {
  FixArea,
  BookmarkComponent,
} from "../Writing/Components/ContentComponents/LowerComponents/LowerArea";
import DeleteModal from "../../../Common/DeleteModal";

const ViewPage = () => {
  const keywords = [
    { id: 0, label: "도전", color: "#2ABCDC" },
    { id: 1, label: "어려움", color: "#FF971D" },
    { id: 2, label: "성공", color: "#4B9EFF" },
    { id: 3, label: "실패", color: "#F25454" },
    { id: 4, label: "배움", color: "#42B887" },
  ];

  const [userInfo, setUserInfo] = useRecoilState(recoilUserData);
  const [answer, setAnswer] = useRecoilState(answerState);
  const [tempInput, setTempInput] = useRecoilState(tempInputState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answerObject, setAnswerObject] = useState({});
  const [expId, setExpId] = useState(null);
  const [userId, setUserId] = useState("");

  const [snack, setSnack] = useRecoilState(recoilSnack);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/experience");
  };

  const moveToEdit = () => {
    navigate("/edit");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userInfo.id != null) setExpId(userInfo.id);
    if (userInfo.user_id != "") setUserId(userInfo.user_id);
    // console.log("line 69: ", userInfo.id, userInfo.user_id);
  }, [userInfo]);

  //temp
  useEffect(() => {
    setTempInput(answer);
  }, [setAnswer, answer]);

  useEffect(() => {
    const getRecord = async (id) => {
      // console.log(id);
      try {
        const response = await getOneExperienceAPI(id);
        // console.log(response.success);
        if (response) {
          // console.log(response);
          setAnswerObject(response.response_object);

          // setTempInput(response.response_object);
        }
      } catch (error) {
        // console.error(error);
      }
    };
    if (expId) getRecord(expId);
  }, [expId]);

  // answerObject가 업데이트되면 answer 상태를 업데이트
  useEffect(() => {
    if (answerObject !== null) {
      setAnswer({
        ...answer,
        exp_date: answerObject.exp_date,
        title: answerObject.title,
        tag_ids: answerObject.tag_ids,
        free_content: answerObject.free_content,
        question_ids: answerObject.question_ids,
        question_answers: answerObject.question_answers,
        question_texts: answerObject.question_texts,
        reference_links: answerObject.reference_links,
        common_question_answer: answerObject.common_question_answer,
      });
    }
  }, [answerObject, setAnswer]);

  // console.log(answer);

  // 중간 배열 생성
  const combinedArray =
    answerObject.question_texts &&
    answerObject.question_texts.map((_, index) => [
      answerObject.tag_ids[index],
      answerObject.question_texts[index],
      answerObject.question_answers[index],
    ]);

  const { location } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Div>
      {/* 뒤로 가기 */}
      <GoBackArea>
        <MarginTopForGoBackDiv />
        <GoBackDiv onClick={handleBack}>
          <GoBackIcon />
          <div>경험 기록 페이지 나가기</div>
        </GoBackDiv>
        <MarginBottomForGoBackDiv />
      </GoBackArea>

      <UpperArea answerObject={answerObject} />

      <StyledHr />

      {/* 경험 기록 내용 */}
      <FixAreaWrapper>
        {combinedArray &&
          combinedArray.map((item, index) => {
            const keyword = keywords.find((k) => k.id + 1 === item[0]);
            return (
              <FixArea key={index}>
                {keyword && (
                  <StyledTag borderColor={keyword.color} color={keyword.color}>
                    {keyword.label}
                  </StyledTag>
                )}
                <FixAreaLabel>{item[1]}</FixAreaLabel>
                <FixAnswer>{item[2]}</FixAnswer>
              </FixArea>
            );
          })}
      </FixAreaWrapper>

      {answerObject.free_content && answerObject.free_content.length != 0 && (
        <>
          <StyledHr />
          <FixArea>
            <FixAreaLabel>자유란</FixAreaLabel>
            <FixAnswer>{answerObject && answerObject.free_content}</FixAnswer>
          </FixArea>
        </>
      )}

      {answerObject.reference_links &&
        answerObject.reference_links.length != 0 && (
          <>
            <StyledHr />
            <FixArea>
              <FixAreaLabel>관련 자료 링크</FixAreaLabel>
              {answerObject.reference_links &&
                answerObject.reference_links.map((link, index) => (
                  <BookmarkComponent key={index}>
                    <Bookmark url={link} />
                  </BookmarkComponent>
                ))}
            </FixArea>
          </>
        )}

      <ButtonArea>
        <Button
          color={(props) => props.theme.color.white}
          bgColor={(props) => props.theme.color.main}
          onClick={moveToEdit}
        >
          수정하기
        </Button>
        <Button
          color={(props) => props.theme.color.base6}
          bgColor={(props) => props.theme.color.base3}
          onClick={openModal}
        >
          삭제하기
        </Button>
      </ButtonArea>

      {/* 모달 컴포넌트 */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal} // 모달 닫기 함수 설정
        bigAlertText1="삭제하신 경험기록은"
        bigAlertText2="완전히 사라지게 됩니다."
        smallAlertText="경험기록을 정말 삭제하시겠습니까?"
        keepButtonText="경험기록 유지하기"
        deleteButtonText="삭제하기"
        keepButtonWidth="174px"
        onKeep={() => {
          // '계속 작성' 버튼 클릭 시 처리 로직
          // console.log("유지");
          closeModal(); // 모달 닫기
        }}
        onDelete={async () => {
          // '삭제' 버튼 클릭 시 처리 로직
          // console.log("삭제");
          // console.log("경험: " + expId, "사용자: " + userInfo.user_id);
          try {
            const response = await deleteOneExperienceAPI(
              expId,
              userInfo.user_id
            );
            // console.log(response);
            setSnack({
              ...snack,
              experienceDelete: true,
            });
          } catch (error) {
            // console.log(error);
          }
          closeModal(); // 모달 닫기
          navigate("/experience");
        }}
      />
    </Div>
  );
};

const StyledHr = styled.hr`
  border: 0;
  width: 840px;
  height: 1px;
  background-color: ${(props) => props.theme.color.base4};

  margin-top: 43px;
  margin-bottom: 50px;
`;

const FixAreaWrapper = styled.div`
  gap: 60px;
`;

const FixAnswer = styled.div`
  min-height: 46px;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: 400px;
  line-height: 23.4px;
  color: ${(props) => props.theme.color.black};
  white-space: pre-wrap;
`;

const ButtonArea = styled.div`
  flex-direction: row;
  gap: 10px;

  margin-top: 60px;
  margin-bottom: 136px;
  user-select: none;
`;

const Button = styled.div`
  justify-content: center;

  width: 126px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};

  font-size: ${(props) => props.theme.fontSizes.TextXL};
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  cursor: pointer;
`;
export default ViewPage;
