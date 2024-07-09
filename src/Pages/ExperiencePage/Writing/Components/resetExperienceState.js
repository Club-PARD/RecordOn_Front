export const resetExperienceState = (
  setExperience,
  setIsExpRecordSubmitted
) => {
  setIsExpRecordSubmitted(false);
  setExperience({
    user_id: "",
    exp_date: "",
    exp_title: "",
    tag_ids: [],
    free_content: "",
    question_ids: [],
    question_answers: [],
    reference_links: [],
    common_question_answer: "",
  });
};
