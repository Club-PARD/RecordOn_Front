import axios from 'axios'

// 유저의 모든 프로젝트 데이터를 받아옴
export const getUserProjectDataAPI = async (id) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_DEV_URL}projects/list/${id}`);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
        alert("유저 정보 로딩에 실패하였습니다.");
    }


};
