import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 제출 내용 관리
export const experienceState = atom({
  key: "experienceState",
  default: {
    user_id: "2e36c965-f524-445e-ba01-680b8e67f613",
    projects_id: 10,
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

// 서버에서 받아온 저장 내용 관리
export const answerState = atom({
  key: "answerState",
  default: {
    exp_date: "",
    experience_name: "",
    tag_id: [],
    free_content: "",
    question_id: [],
    question_answer: [],
    question_text: [],
    reference_link: [],
    common_question_answer: "",
  },
  effects_UNSTABLE: [persistAtom],
});

// 제출 동작 관리
export const handleExpRecordSubmit = atom({
  key: "handleExpRecordSubmit",
  default: false,
});