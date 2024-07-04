import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;

//모든 태그와, 태그에 대한 질문들을 가져오는 API
export const getAllTagAndQuestionAPI = async () => {
    const requestUrl = `${server}question/get`;
    console.log (requestUrl);
  try {
    const response = await axios.get(requestUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
