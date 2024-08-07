// import axios from 'axios'
import api from './axiosConfig.mjs';
import qs from 'qs';

// 유저의 모든 프로젝트 데이터를 받아옴
export const getUserProjectDataAPI = async (id) => {

    try {
        const response = await api.get(`${process.env.REACT_APP_DEV_URL}projects/list/${id}`);
        // console.log(response.data)
        return response.data
    } catch (error) {
        // console.error('Error fetching data: ', error);
        // alert("유저 정보 로딩에 실패하였습니다.");
    }

};

// 유저의 한 프로젝트 데이터를 받아옴
export const getOneProjectDataAPI = async (userData) => {
    // console.log(userData);
    try {
        const response = await api.post(`${process.env.REACT_APP_DEV_URL}projects/${userData.project_id}`,
            {
                user_id: userData.user_id
            });
        // console.log(response.data)
        return response.data.response_object
    } catch (error) {
        // console.error('Error fetching data: ', error);
        // alert("유저 정보 로딩에 실패하였습니다.");
    }

};

export const getUserProjectDataFilteredAPI = async (filter) => {
    // console.log(filter);
    try {
        const response = await api.post(`${process.env.REACT_APP_DEV_URL}projects/search`, filter);
        // console.log(response.data.response_object)
        return response.data.response_object
    } catch (error) {
        // console.error('Error fetching data: ', error);
        // alert("유저 정보 로딩에 실패하였습니다.");
    }
};

// 새 프로젝트 생성
export const postNewProjectAPI = async (data) => {
    try {
        // console.log(`${process.env.REACT_APP_DEV_URL}projects`);
        const response = await api.post(`${process.env.REACT_APP_DEV_URL}projects`, data);
        // console.log(response.data)
        return response.data
    } catch (error) {
        // console.error('Error fetching data: ', error);
    }

};

export const postNewProjectImageAPI = async (formData, project_id) => {
    if (formData == undefined || formData == "") {
        // console.log("이미지 업로드 안함");
        return 0;
    }
    // console.log(formData.length);
    try {
        // console.log(`${process.env.REACT_APP_DEV_URL}s3/${project_id}`);
        // console.log(formData);
        const response = await api.post(`${process.env.REACT_APP_DEV_URL}s3/${project_id}`, formData
            , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        // console.log(response.data)
        return response.data
    } catch (error) {
        // console.error('Error fetching data: ', error);
    }

};

export const updateProjectAPI = async (project_id, data) => {
    try {
        // console.log(data);
        const response = await api.put(`${process.env.REACT_APP_DEV_URL}projects/${project_id}`, data);
        // console.log(response.data)
        return response.data
    } catch (error) {
        // console.error('Error fetching data: ', error);
    }

};

export const deleteProjectAPI = async (data) => {
    try {
        // console.log(`${process.env.REACT_APP_DEV_URL}projects/${data.project_id}`, data.user_id);
        const response = await api.delete(`${process.env.REACT_APP_DEV_URL}projects/${data.project_id}`, {
            data: {
                user_id: data.user_id
            }

        });
        // console.log(response.data)
        return response.data
    } catch (error) {
        // console.error('Error fetching data: ', error);
    }

};

export const getUserExperienceDataFilteredAPI = async (filter) => {
    // console.log(filter);
    try {
        // console.log(`${process.env.REACT_APP_DEV_URL}experiences/search`);
        const response = await api.post(`${process.env.REACT_APP_DEV_URL}experiences/search`, filter);
        // console.log(response.data.response_object)
        return response.data.response_object
    } catch (error) {
        // console.error('Error fetching data: ', error);
        // alert("유저 정보 로딩에 실패하였습니다.");
    }
};

export const getUserExperienceDataAPI = async (userKey) => {
    // console.log(userKey);
    try {
        // console.log(`${process.env.REACT_APP_DEV_URL}experiences/project`);
        const response = await api.post(`${process.env.REACT_APP_DEV_URL}experiences/project`, userKey);
        // console.log(response.data.response_object)
        return response.data.response_object
    } catch (error) {
        // console.error('Error fetching data: ', error);
        // alert("유저 정보 로딩에 실패하였습니다.");
    }
};

export const restartProjectAPI = async (projectData) => {
    // console.log(projectData.user_id);
    try {
        // console.log(`${process.env.REACT_APP_DEV_URL}projects/resume/${projectData.project_id}`);
        const response = await api.put(`${process.env.REACT_APP_DEV_URL}projects/resume/${projectData.project_id}`, {
            user_id: projectData.user_id
        });
        // console.log(response.data)
        return response.data
    } catch (error) {
        // console.error('Error fetching data: ', error);
        // alert("유저 정보 로딩에 실패하였습니다.");
    }
};

export const putProjectTagAPI = async (projectData, data) => {
    // console.log(projectData.user_id);
    try {
        // console.log(`${process.env.REACT_APP_DEV_URL}projects/finish/${projectData.project_id}`);
        const response = await api.put(`${process.env.REACT_APP_DEV_URL}projects/finish/${projectData.project_id}`, {
            user_id: projectData.user_id
            , competency_tag_ids: data
        });
        // console.log(response.data)
        return response.data
    } catch (error) {
        // console.error('Error fetching data: ', error);
        // alert("유저 정보 로딩에 실패하였습니다.");
    }
}
export const getAllLink = async (data) => {
    try {
        const response = await api.post(`${process.env.REACT_APP_DEV_URL}projects/reference`, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        // console.error(error);
    }
};
