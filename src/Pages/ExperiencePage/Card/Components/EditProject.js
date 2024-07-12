import styled from "styled-components";
import { useEffect, useState } from "react";
import EditProjectModal from "./EditProjectModal";
import { getOneProjectDataAPI } from "../../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilUserData } from "../../../../Atom/UserDataAtom";


const EditProject = () => {

    const [modalOn, setModalOn] = useState(false);
    const [userData, setUserData] = useRecoilState(recoilUserData);
    const [projectData, setProjectData] = useState({});


    const getProjectData = async () => {
        const response = await getOneProjectDataAPI(userData);
        // console.log(response);
        setProjectData({
            user_id: userData.user_id,
            name: response.project_name,
            description: response.description,
            part: response.part,
            start_date: new Date(response.start_date),
            finish_date: new Date(response.finish_date),
            project_image: response.project_image,
        })
        return 1;
    }

    const editClickHandler = async () => {
        const done = await getProjectData();
        // console.log(done);
        setModalOn(true);
    }

    // console.log(projectData);
    // console.log(new Date(projectData.finish_date));

    return (
        <>
            <EditProjectButton onClick={editClickHandler}>
                편집하기
            </EditProjectButton>
            {modalOn && <EditProjectModal isOpen={modalOn} onClose={() => setModalOn(false)} propsProjectData={projectData} />}
        </>
    );
};


const EditProjectButton = styled.button`
width: 62px;
height: 32px;
/* border: 1px solid black; */
color: ${(props) => props.theme.color.main};
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
justify-content: center;
align-items: center;
margin-top: 4px;
/* text-decoration: underline; */
cursor: pointer;
white-space : nowrap;
`

export default EditProject;
