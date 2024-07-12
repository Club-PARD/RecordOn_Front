import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  handleExpRecordSubmit,
  experienceState,
} from "../../../Atom/ExpRecordAtom";
import { recoilSnack, recoilUserData } from "../../../Atom/UserDataAtom";
import { ReactComponent as GoBackIcon } from "../../../Assets/GoBackIcon.svg";
import ContentArea from "./Components/ContentsArea";
import { postExperienceAPI } from "../../../Axios/ExperienceApi";
import DeleteModal from "../../../Common/DeleteModal";
import { resetExperienceState } from "./Components/resetExperienceState";

const WritingPage = () => {
  const [experience, setExperience] = useRecoilState(experienceState);

  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [snack, setSnack] = useRecoilState(recoilSnack);
  const [isExpRecordSubmitted, setIsExpRecordSubmitted] = useRecoilState(
    handleExpRecordSubmit
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsExpRecordSubmitted(false);
  };

  const handleSubmit = async () => {
    setIsExpRecordSubmitted(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    setIsUpdated(true);
  };

  const checkUserAndProjectInfo = async () => {
    // 유저 ID와 프로젝트 ID를 비동기적으로 확인하는 로직
    if (
      experience.user_id &&
      experience.user_id !== "" &&
      experience.projects_id &&
      experience.projects_id !== ""
    ) {
      return true;
    } else {
      throw new Error("유저 ID나 프로젝트 ID가 올바르지 않습니다.");
    }
  };

  // 유효성 검사
  const validateUserId = (userId, errors) => {
    if (!userId || typeof userId !== "string" || userId.trim() === "") {
      errors.push("유효하지 않은 유저 ID입니다.");
    }
  };

  const validateProjectsId = (projectsId, errors) => {
    if (projectsId === null || projectsId === undefined) {
      errors.push("유효하지 않은 프로젝트 ID입니다.");
    }
  };

  const validateTitle = (title, errors) => {
    if (!title || typeof title !== "string" || title.trim() === "") {
      errors.push("제목을 입력해 주세요.");
    }
  };

  const validateTagIds = (tagIds, errors) => {
    if (!Array.isArray(tagIds)) {
      errors.push("유효하지 않은 태그 ID 배열입니다.");
    } else {
      tagIds.forEach((tagId) => {
        if (typeof tagId !== "number") {
          errors.push("경험태그를 선택해 주세요.");
        }
      });
    }
  };

  const validateQuestionIds = (questionIds, errors) => {
    if (!Array.isArray(questionIds)) {
      errors.push("유효하지 않은 질문 ID 배열입니다.");
    } else {
      questionIds.forEach((questionId) => {
        if (typeof questionId !== "number") {
          errors.push("답변을 작성할 질문을 선택해 주세요.");
        }
      });
    }
  };

  const validateQuestionAnswers = (questionAnswers, errors) => {
    if (!Array.isArray(questionAnswers)) {
      errors.push("유효하지 않은 질문 답변 배열입니다.");
    } else {
      questionAnswers.forEach((answer) => {
        if (typeof answer !== "string" || answer.trim() === "") {
          errors.push("선택하신 질문에 대한 답변을 입력해 주세요.");
        }
      });
    }
  };

  const validateCommonQuestionAnswer = (commonQuestionAnswer, errors) => {
    if (typeof commonQuestionAnswer !== "string") {
      errors.push("연상되는 단어를 입력해 주세요.");
    }
  };

  const validateReferenceLinks = (referenceLinks, errors) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (!Array.isArray(referenceLinks)) {
      errors.push("유효하지 않은 참조 링크 배열입니다.");
    } else {
      referenceLinks.forEach((link) => {
        if (!urlPattern.test(link)) {
          errors.push("유효하지 않은 URL 형식입니다: " + link);
        }
      });
    }
  };

  const validateExperience = (experience) => {
    let errors = [];
    validateUserId(experience.user_id, errors);
    validateProjectsId(experience.projects_id, errors);
    validateTitle(experience.title, errors);
    validateTagIds(experience.tag_ids, errors);
    validateQuestionIds(experience.question_ids, errors);
    validateQuestionAnswers(experience.question_answers, errors);
    validateCommonQuestionAnswer(experience.common_question_answer, errors);
    validateReferenceLinks(experience.reference_links, errors);
    return errors;
  };

  const submitData = async () => {
    if (isExpRecordSubmitted && isUpdated) {
      try {
        await checkUserAndProjectInfo();
        console.log(
          "유저 및 프로젝트 정보: ",
          experience.user_id,
          experience.projects_id
        );

        // 유효성 검사 추가
        const errors = validateExperience(experience);
        if (errors.length > 0) {
          // alert("다음 항목을 확인해 주세요:\n" + errors.join("\n"));
          setSnack({
            ...snack,
            experienceValidation: true,
          })
          setIsExpRecordSubmitted(false);
          setIsUpdated(false);
          return;
        }

        const response = await postExperienceAPI(experience);
        console.log("request successful: ", response);
        setSnack((prevSnack) => ({
          ...prevSnack,
          experienceAdd: true,
        }));
        navigate("/experience");
      } catch (error) {
        console.error("request failed: ", error);
        setIsExpRecordSubmitted(false);
        setIsUpdated(false);
      }
    }
  };

  useEffect(() => {
    submitData();
  }, [isUpdated]);

  const { location } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

      {/* 내용 작성 영역 */}
      <ContentArea />

      {/* 버튼 */}
      <ConfirmButton onClick={handleSubmit}>경험기록 작성완료</ConfirmButton>

      {/* 모달 컴포넌트 */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal} // 모달 닫기 함수 설정
        bigAlertText1="중단하신 기록은"
        bigAlertText2="저장되지 않습니다."
        smallAlertText="경험 기록 페이지에서 정말 나가시겠습니까?"
        keepButtonText="남아서 기록하기"
        deleteButtonText="나가기"
        keepButtonWidth="151px"
        onKeep={() => {
          console.log("계속 작성");
          closeModal();
        }}
        onDelete={() => {
          console.log("나가기");
          resetExperienceState(setExperience, setIsExpRecordSubmitted);
          closeModal(); // 모달 닫기
          navigate("/experience");
        }}
      />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const GoBackArea = styled.div`
  position: fixed;
  top: 70;

  z-index: 9999;
  background-color: ${(props) => props.theme.color.white};
`;

const MarginTopForGoBackDiv = styled.div`
  height: 46px;
  width: 1200px;

  background-color: ${(props) => props.theme.color.white};
`;

const GoBackDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10.21px;

  background-color: ${(props) => props.theme.color.white};

  margin-left: -1000px;

  cursor: pointer;

  div {
    font-weight: ${(props) => props.theme.fontWeights.TextM};
    font-size: ${(props) => props.theme.fontSizes.TextM};
    color: ${(props) => props.theme.color.base6};
  }
  user-select: none;
`;

const MarginBottomForGoBackDiv = styled.div`
  height: 42px;
  width: 1200px;
  background-color: ${(props) => props.theme.color.white};
`;

const ConfirmButton = styled.button`
  justify-content: center;

  width: 229px;
  height: 50px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.color.main};

  color: ${(props) => props.theme.color.white};
  font-weight: ${(props) => props.theme.fontWeights.TextXL};
  font-size: ${(props) => props.theme.fontSizes.TextXL};

  margin-bottom: 79px;

  cursor: pointer;
`;

export default WritingPage;
export {
  Div,
  GoBackArea,
  MarginTopForGoBackDiv,
  MarginBottomForGoBackDiv,
  GoBackDiv,
  GoBackIcon,
};
