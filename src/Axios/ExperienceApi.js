// import axios from "axios";
import api from "./axiosConfig.mjs";

const server = process.env.REACT_APP_DEV_URL;

// 경험 기록 등록 API
export const postExperienceAPI = async (data) => {
  console.log(data);
  try {
    const response = await api.post(`${server}experiences`, data);
    console.log(response.status);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 경험 기록 하나 조회 API
export const getOneExperienceAPI = async (expId) => {
  console.log(expId);
  try {
    const response = await api.get(`${server}experiences/${expId}`);
    if (response.data.success) {
      console.log(response.data.response_object);
    } else {
      console.error("API 호출 실패: ", response.data.message);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 경험 기록 삭제 API
export const deleteOneExperienceAPI = async (expId, user_id) => {
  console.log(
    `Attempting to delete experience with ID: ${expId} for user ID: ${user_id}`
  );
  try {
    const response = await api.delete(`${server}experiences/${expId}`, {
      data: { user_id },
    });
    console.log("Delete successful:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 보냈지만, 상태 코드가 범위 2xx 이외일 때
      console.error(`Error response from server: ${error.response.data}`);
      console.error(`Status code: ${error.response.status}`);
      console.error(`Headers: ${JSON.stringify(error.response.headers)}`);
    } else if (error.request) {
      // 요청이 만들어졌지만, 서버로부터 응답을 받지 못했을 때
      console.error("No response received from server.");
      console.error(error.request);
    } else {
      // 요청을 설정하는 도중에 문제가 발생했을 때
      console.error("Error setting up the request:", error.message);
    }
    console.error("Error config:", error.config);
    throw error; // 필요에 따라 에러를 다시 던질 수도 있습니다.
  }
};

// 경험 기록 수정 API
export const editOneExpereienceAPI = async (id, data) => {
  {
    console.log("id: " + id, "data: " + JSON.stringify(data));
  }
  try {
    const response = await api.put(`${server}experiences/${id}`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
