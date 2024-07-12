import styled from "styled-components";
import AddProject from "./AddProject";
import { useState } from "react";
import { getUserProjectDataAPI } from "../../../Axios/ProjectDataApi";
import { useRecoilState, useResetRecoilState } from "recoil";
import { isFirstLogin, recoilUserData, recoilUserExperienceFilter } from "../../../Atom/UserDataAtom";
import { useEffect } from "react";
import ProjectTitleFolder from "../../../Assets/ProjectTitleFolder.png"
import { experienceState } from "../../../Atom/ExpRecordAtom";
import WelcomeModal from "../../Home/Components/WelcomeModal";
import { tr } from "date-fns/locale";


const ProjectTitle = () => {

    const [userData, setUserData] = useRecoilState(recoilUserData);
    const [userName, setUserName] = useState("");
    const [experienceStateRecoil, setExperienceStateRecoil] = useRecoilState(experienceState);
    const [experienceFilter, setExperienceFilter] = useRecoilState(recoilUserExperienceFilter);
    const [firstLoginRecoil, isFirstLoginRecoil] = useRecoilState(isFirstLogin);
    const [welcomeModalOn, setWelcomeModalOn] = useState(false);

    useEffect(() => {
        if (firstLoginRecoil == true) {
            setWelcomeModalOn(true);
        }
    }, [firstLoginRecoil])

    // console.log("experienceStateRecoil", experienceStateRecoil);
    // console.log("유저 정보", userData);

    useEffect(() => {
        if (userData.user_id == null) {

        }
        // console.log(userData);
        // console.log(userData.user_id);
        const getData = async () => {
            const response = await getUserProjectDataAPI(userData.user_id);
            // console.log(response);
            setUserName(response?.user_name);
        }
        getData();
        setExperienceFilter({
            ...experienceFilter,
            tag_name: [],
            start_date: "",
            finish_date: "",
            search_text: "",
            sort_type: 2,
        });
    }, [])

    const welcomeModalOff = () => {
        isFirstLoginRecoil(false);
        setWelcomeModalOn(false);
    }

    return (
        <ProjectTitleDiv>
            <ProjectTitleImage src={ProjectTitleFolder} />
            <ProjectTitleText>
                {userName}님의
            </ProjectTitleText>
            <ProjectTitleText2>
                프로젝트가 쌓이는 공간이에요!
            </ProjectTitleText2>
            <AddProject />

            {/* {welcomeModalOn && (
                <WelcomeModal onClose={welcomeModalOff} />
            )} */}
        </ProjectTitleDiv>
    );
};
const ProjectTitleDiv = styled.div`
width: 1056px;
height: 280px;
margin-top: 62px;
/* border: 1px solid black; */
justify-content: start;
user-select : none;
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
