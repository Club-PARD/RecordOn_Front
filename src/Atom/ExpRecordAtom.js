import { atom } from "recoil";

// 제출 내용 관리
export const experienceState = atom({
  key: "experienceState",
  default: {
    user_id: "",
    exp_date: "",
    exp_title: "",
    tag_ids: [],
    free_content: "",
    question_ids: [],
    question_answers: [],
    reference_links: [],
    common_question_answer: "",
  },
});

// 제출 동작 관리
export const handleExpRecordSubmit = atom({
  key: "handleExpRecordSubmit",
  default: false,
});

// 경험 태그 선택 상태 관리
export const expTagSelectState = atom({
  key: "expTagSelectState",
  default: {
    isTagClicked: false,
    selectedTagId: null,
  },
});

// 질문 선택 상태 관리
export const questionSelectState = atom({
  key: "questionSelectState",
  default: {
    isQuestionClicked: false,
    selectedQuestionId: null,
  },
});
