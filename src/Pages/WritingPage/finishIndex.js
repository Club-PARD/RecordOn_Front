import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UpperArea, {
  StyledTag,
  FixAreaLabel,
} from "./FinishComponents/UpperArea";
import {
  Div,
  GoBackArea,
  MarginTopForGoBackDiv,
  MarginBottomForGoBackDiv,
  GoBackDiv,
  GoBackIcon,
} from "./index";
import Bookmark from "./Components/ContentComponents/Bookmark";
import {
  FixArea,
  BookmarkComponent,
} from "./Components/ContentComponents/LowerArea";
import DeleteModal from "../../Common/DeleteModal";
import {
  getOneExperienceAPI,
  deleteOneExperienceAPI,
} from "../../Axios/ExperienceApi";

const ViewPage = () => {
  const keywords = [
    { id: 0, label: "도전", color: "#2ABCDC" },
    { id: 1, label: "어려움", color: "#FF971D" },
    { id: 2, label: "성공", color: "#4B9EFF" },
    { id: 3, label: "실패", color: "#F25454" },
    { id: 4, label: "배움", color: "#42B887" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answerObject, setAnswerObject] = useState({});
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getRecord = async () => {
      try {
        const id = 3;
        const response = await getOneExperienceAPI(id);
        console.log(response.success);
        setAnswerObject(response.response_object);
      } catch (error) {
        console.error(error);
      }
    };
    getRecord();
  }, []);

  return (
    <Div>
      {/* 뒤로 가기 */}
      <GoBackArea>
        <MarginTopForGoBackDiv />
        <GoBackDiv onClick={openModal}>
          <GoBackIcon />
          <div>경험 기록 페이지 나가기</div>
        </GoBackDiv>
        <MarginBottomForGoBackDiv />
      </GoBackArea>

      <UpperArea answerObject={answerObject} />

      <StyledHr />

      <FixAreaWrapper>

        <FixArea>

            {/* 태그 */}
          {answerObject.tag_id &&
            answerObject.tag_id.map((tagId, index) => {
              const keyword = keywords.find((k) => k.id + 1 === tagId);
              return (
                <StyledTag
                  key={index}
                  borderColor={keyword ? keyword.color : "#000"}
                  color={keyword ? keyword.color : "#000"}
                >
                  {keyword ? keyword.label : ""}
                </StyledTag>
              );
            })}

            {/* 질문 */}
          <FixAreaLabel>
            {answerObject && answerObject.question_text}
          </FixAreaLabel>

            {/* 질문 */}
          <FixAnswer>{answerObject && answerObject.question_answer}</FixAnswer>

        </FixArea>


      </FixAreaWrapper>

      <StyledHr marginTop={"46px"} />

      <FixArea>
        <FixAreaLabel>자유란</FixAreaLabel>
        <FixAnswer>{answerObject && answerObject.free_content}</FixAnswer>
      </FixArea>

      <StyledHr marginTop={"46px"} />

      <FixArea>
        <FixAreaLabel>관련 자료 링크</FixAreaLabel>
        <BookmarkComponent>
          <Bookmark />
        </BookmarkComponent>
      </FixArea>

      <ButtonArea>
        <Button
          color={(props) => props.theme.color.white}
          bgColor={(props) => props.theme.color.main}
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
        bigAlertText1="삭제하신 경험은"
        bigAlertText2="저장되지 않습니다."
        smallAlertText="경험기록을 정말 삭제하시겠습니까?"
        keepButtonText="경험기록 유지하기"
        deleteButtonText="삭제하기"
        keepButtonWidth="174px"
        onKeep={() => {
          // '계속 작성' 버튼 클릭 시 처리 로직
          console.log("유지");
          closeModal(); // 모달 닫기
        }}
        onDelete={() => {
          // '삭제' 버튼 클릭 시 처리 로직
          console.log("삭제");
          deleteOneExperienceAPI();
          closeModal(); // 모달 닫기
          navigate("/experience");
        }}
      />
      {answerObject && console.log(answerObject)}
    </Div>
  );
};

const StyledHr = styled.hr`
  border: 0;
  width: 840px;
  height: 1px;
  background-color: ${(props) => props.theme.color.base4};

  margin-top: ${(props) => props.marginTop};
  margin-bottom: 50px;
`;

const FixAreaWrapper = styled.div`
  gap: 60px;
`;

const FixAnswer = styled.div`
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: 400px;
  line-height: 23.4px;
  color: ${(props) => props.theme.color.black};
`;

const ButtonArea = styled.div`
  flex-direction: row;
  gap: 10px;

  margin-top: 50px;
  margin-bottom: 136px;
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
