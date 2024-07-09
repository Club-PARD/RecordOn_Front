import { atom } from "recoil";

// 제출 내용 관리
export const experienceState = atom({
  key: "experienceState",
  default: {
    user_id: "",
    projects_id: 0,
    exp_date: "",
    title: "",
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