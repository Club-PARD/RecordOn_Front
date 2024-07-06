import axios from "axios";

const server = process.env.REACT_APP_DEV_URL;

// URL을 보내면 메타데이터를 가져오는 API
export const getUrlMetaData = async (url) => {
  console.log(typeof url);
  console.log(url);
  try {
    const response = await axios.get(`${server}reference/get`, {
      params: { url: url },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // 에러 처리를 위해 예외를 다시 던집니다.
  }
};

// URL을 인코딩합니다.
// const encodedUrl = encodeURIComponent(url);
// console.log(encodedUrl);
