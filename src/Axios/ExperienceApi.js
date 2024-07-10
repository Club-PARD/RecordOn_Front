import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;

// 경험 기록 등록 API
export const postExperienceAPI = async (data) => {
    console.log (data);
    try {
        const response = await axios.post (`${server}experiences`, data);
        console.log (response.status);
        return response;
    } catch (error) {
        console.error(error);
    }
};

// 경험 기록 하나 조회 API
export const getOneExperienceAPI = async (expId) => {
    console.log (expId);
    try {
        const response = await axios.get (`${server}experiences/${expId}`);
        if (response.data.success) {
            console.log (response.data.response_object);
        } else {
            console.error("API 호출 실패: ", response.data.message);
        }
        console.log (response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// 경험 기록 삭제 API
export const deleteOneExperienceAPI = async (expId, userId) => {
    console.log (expId, userId);
try{
    const response = await axios.get (`${server}experiences/${expId}`, userId);
console.log (response.data);
return response.data;
}catch(error) {
    console.log (error);
}
};


// 경험 기록 수정 API
export const editOneExpereienceAPI = async (id=10, data) => {
    try {
        const response = await axios.get (`${server}experiences/${id}`, data);
        console.log (response.data);
    } catch (error) {
        console.error(error);
    }
}