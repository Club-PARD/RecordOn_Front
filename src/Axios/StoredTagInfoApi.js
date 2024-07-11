// import axios from "axios";
import api from './axiosConfig.mjs';

const server = process.env.REACT_APP_DEV_URL;

//모든 태그와, 태그에 대한 질문들을 가져오는 API
export const getAllTagAndQuestionAPI = async () => {
    const requestUrl = `${server}question/get`;
    console.log (requestUrl);
  try {
    const response = await api.get(requestUrl);
    console.log (response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
