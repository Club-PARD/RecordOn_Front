// import axios from 'axios'
import api from './axiosConfig.mjs';
import qs from 'qs';

// 유저의 모든 프로젝트 데이터를 받아옴
export const registerUserAPI = async (loginData) => {

    try {
        console.log(loginData)
        const response = await api.put(`${process.env.REACT_APP_DEV_URL}user/register`, loginData);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
        // alert("유저 정보 로딩에 실패하였습니다.");
    }

};