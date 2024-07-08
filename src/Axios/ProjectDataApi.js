import axios from 'axios'
import qs from 'qs';

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

export const getUserProjectDataFilteredAPI = async (filter) => {
    console.log(filter);
    try {
        const response = await axios.post(`${process.env.REACT_APP_DEV_URL}projects/search`, filter);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
        alert("유저 정보 로딩에 실패하였습니다.");
    }
};

// 새 프로젝트 생성
export const postNewProjectAPI = async (data) => {
    try {
        console.log(`${process.env.REACT_APP_DEV_URL}projects`);
        const response = await axios.post(`${process.env.REACT_APP_DEV_URL}projects`, data);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

};

export const postNewProjectImageAPI = async (formData, project_id) => {
    if (formData == undefined || formData == "") {
        console.log("이미지 업로드 안함");
        return 0;
    }
    try {
        console.log(`${process.env.REACT_APP_DEV_URL}s3/${project_id}`);
        console.log(formData);
        const response = await axios.post(`${process.env.REACT_APP_DEV_URL}s3/${project_id}`, formData
            , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

};

export const updateProjectAPI = async (project_id, data) => {
    try {
        console.log(`${process.env.REACT_APP_DEV_URL}projects`);
        const response = await axios.put(`${process.env.REACT_APP_DEV_URL}projects/${project_id}`, data);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

};

export const deleteProjectAPI = async (data) => {
    try {
        console.log(`${process.env.REACT_APP_DEV_URL}projects/${data.project_id}`, data.user_id);
        const response = await axios.delete(`${process.env.REACT_APP_DEV_URL}projects/${data.project_id}`, {
            data: {
                user_id: data.user_id
            }

        });
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
    }

};

export const getUserExperienceDataFilteredAPI = async (filter) => {
    console.log(filter);
    try {
        console.log(`${process.env.REACT_APP_DEV_URL}experiences/search`);
        const response = await axios.post(`${process.env.REACT_APP_DEV_URL}experiences/search`, filter);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
        alert("유저 정보 로딩에 실패하였습니다.");
    }
};

export const getUserExperienceDataAPI = async (userKey) => {
    console.log(userKey);
    try {
        console.log(`${process.env.REACT_APP_DEV_URL}experiences/project`);
        const response = await axios.post(`${process.env.REACT_APP_DEV_URL}experiences/project`, userKey);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
        alert("유저 정보 로딩에 실패하였습니다.");
    }
};

export const restartProjectAPI = async (projectData) => {
    console.log(projectData.user_id);
    try {
        console.log(`${process.env.REACT_APP_DEV_URL}projects/resume/${projectData.project_id}`);
        const response = await axios.put(`${process.env.REACT_APP_DEV_URL}projects/resume/${projectData.project_id}`, {
            user_id: projectData.user_id
        });
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data: ', error);
        alert("유저 정보 로딩에 실패하였습니다.");
    }
};