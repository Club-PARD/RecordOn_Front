import styled from "styled-components";
import AddProject from "./AddProject";
import { useState } from "react";
import { getUserProjectDataAPI } from "../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilUserId, recoilUserProjectNum } from "../../../Atom/UserDataAtom";
import { useEffect } from "react";


const ProjectTitle = () => {

    const [userId, setUserId] = useRecoilState(recoilUserId);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const getData = async () => {
            const response = await getUserProjectDataAPI(userId);
            // console.log(response.user_name);
            setUserName(response.user_name);
        }
        getData();

    }, [])


    return (
        <ProjectTitleDiv>
            <ProjectTitleText>
                {userName}님이 해낸 프로젝트예요!
            </ProjectTitleText>
            <AddProject />
        </ProjectTitleDiv>
    );
};
const ProjectTitleDiv = styled.div`
width: 1056px;
height: 129px;
margin-top: 167px;
/* border: 1px solid black; */
justify-content: space-between;
`

const ProjectTitleText = styled.div`
width: 1056px;
height: 62px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TitleL};
font-weight: ${(props) => props.theme.fontWeights.TitleL};
justify-content: center;
`

export default ProjectTitle;
