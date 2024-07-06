import { atom } from "recoil";

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

export const handleExpRecordSubmit = atom({
  key: "handleExpRecordSubmit",
  default: false,
});
