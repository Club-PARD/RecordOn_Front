import styled from "styled-components";
import AddProject from "./AddProject";
import { useState } from "react";
import { getUserProjectDataAPI } from "../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilUserData } from "../../../Atom/UserDataAtom";
import { useEffect } from "react";
import ProjectTitleFolder from "../../../Assets/ProjectTitleFolder.png"


const ProjectTitle = () => {

    const [userData, setUserData] = useRecoilState(recoilUserData);
    const [userName, setUserName] = useState("");

    console.log(userData);

    // useEffect(() => {
    //     if (userData.user_id == null) {

    //     }
    //     console.log(userData);
    //     console.log(userData.user_id);
    //     const getData = async () => {
    //         const response = await getUserProjectDataAPI(userData.user_id);
    //         // console.log(response.user_name);
    //         setUserName(response?.user_name);
    //     }
    //     getData();

    // }, [])


    return (
        <ProjectTitleDiv>
            <ProjectTitleImage src={ProjectTitleFolder} />
            <ProjectTitleText>
                {userName}님이
            </ProjectTitleText>
            <ProjectTitleText2>
                해낸 프로젝트들이에요!
            </ProjectTitleText2>

            <AddProject />
        </ProjectTitleDiv>
    );
};
const ProjectTitleDiv = styled.div`
width: 1056px;
height: 280px;
margin-top: 62px;
/* border: 1px solid black; */
justify-content: start;
`

const ProjectTitleImage = styled.img`
width: 93px;
/* border: 1px solid black; */
`

const ProjectTitleText = styled.div`
width: 1056px;
height: 62px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TitleL};
font-weight: ${(props) => props.theme.fontWeights.TitleL};
justify-content: center;
`

const ProjectTitleText2 = styled.div`
width: 1056px;
height: 62px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TitleL};
font-weight: ${(props) => props.theme.fontWeights.TitleL};
justify-content: center;
`

export default ProjectTitle;
