import styled from "styled-components";
import AddExperience from "./AddExperience";
import { useState } from "react";
import { getUserExperienceDataAPI } from "../../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilUserData } from "../../../../Atom/UserDataAtom";
import { useEffect } from "react";
import ArrowGray from "../../../../Assets/GoBackIcon.svg"
import ArrowWhite from "../../../../Assets/ArrowWhite.svg"
import BarIcon from "../../../../Assets/BarIcon.svg"
import Project_Default from "../../../../Assets/Project_Default.png"
import FinishProject from "./FinishProject";
import RestartProject from "./RestartProject";
import { useNavigate } from "react-router-dom";
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";
import { experienceState } from "../../../../Atom/ExpRecordAtom";

const ExperienceTitle = () => {

    const [userData, setUserData] = useRecoilState(recoilUserData);
    const [experienceData, setExperienceData] = useRecoilState(experienceState);

    const [projectData, setProjectData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log(userData);
        console.log(experienceData);

        const getData = async () => {

            const response = await getUserExperienceDataAPI(userData);
            console.log(response);
            setProjectData(response);
        }
        getData();

    }, [userData])

    const handleProjectEdit = () => {

    }

    console.log(experienceData);

    return (
        <ExperienceTitleDiv>
            <ExperienceTitleLeft>
                <BackToProject onClick={() => navigate("/project")}>
                    <img src={ArrowGray} style={{ width: "14px", marginRight: "7px" }} />
                    메인 페이지로 돌아가기
                </BackToProject>
            </ExperienceTitleLeft>
            <ExperienceTitleCenter>
                <ProjectImageDiv>
                    {
                        projectData.project_image == null
                            ?
                            <img src={Project_Default} style={{ width: "126px", height: "126px", borderRadius: "100px" }} />
                            :
                            <img src={projectData.project_image} style={{ width: "126px", height: "126px", borderRadius: "100px" }} />
                    }

                </ProjectImageDiv>
                <ProjectProcessDate>
                    {
                        projectData.is_finished == 1
                            ?
                            <ProjectProcess>
                                진행완료
                            </ProjectProcess>
                            : <ProjectProcess>
                                진행중
                            </ProjectProcess>
                    }
                    <ProjectProcessDateBar>
                        <img src={BarIcon} style={{ height: "15px" }} />
                    </ProjectProcessDateBar>
                    <ProjectDate>
                        {projectData.start_date?.substring(0, 10)}~{projectData.finish_date?.substring(0, 10)}
                    </ProjectDate>
                </ProjectProcessDate>
                <ExperienceTitleText>
                    <ProjectEdit></ProjectEdit>
                    <ExperienceTitleTextDiv>
                        {projectData.project_name}
                    </ExperienceTitleTextDiv>
                    <EditProject />
                </ExperienceTitleText>
                <ProjectGoalDiv>
                    <ProjectGoalText>
                        프로젝트 목표
                    </ProjectGoalText>
                    <ProjectGoalContents>
                        {projectData.description}
                    </ProjectGoalContents>
                </ProjectGoalDiv>
                <ProjectRole>
                    <ProjectRoleText>
                        역할
                    </ProjectRoleText>
                    <ProjectRoleContent>
                        {projectData.part}
                    </ProjectRoleContent>
                </ProjectRole>
                <ExperienceButtons>
                    {
                        projectData.is_finished == 1
                            ?
                            <ExperienceButtonsDivDone>
                                <RestartProject />
                            </ExperienceButtonsDivDone>
                            :
                            <ExperienceButtonsDiv>
                                <AddExperience />
                                <FinishProject />
                            </ExperienceButtonsDiv>
                    }

                </ExperienceButtons>
            </ExperienceTitleCenter>
            <ExperienceTitleRight>
                <OpenExperienceLinkModal>
                    관련 자료 링크
                    <img src={ArrowWhite} style={{ width: "10px", marginLeft: "7px" }} />
                </OpenExperienceLinkModal>
                <DeleteProjectDiv>
                    <DeleteProjectText>
                        <DeleteProject />
                    </DeleteProjectText>
                </DeleteProjectDiv>
            </ExperienceTitleRight>

        </ExperienceTitleDiv>
    );
};

const ExperienceTitleDiv = styled.div`
width: 1200px;
height: 552px;
flex-direction:row;
margin-top: 40px;
/* border: 1px solid black; */
justify-content: space-between;
align-items:start;
`
const ExperienceTitleLeft = styled.div`
width: 300px;
height: 552px;
/* border: 1px solid black; */
`
const BackToProject = styled.div`
width: 300px;
height: 25px;
/* border: 1px solid black; */
flex-direction: row;
justify-content:start;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
color: ${(props) => props.theme.colors.Charcoal};
`

const ExperienceTitleCenter = styled.div`
width: 600px;
height: 552px;
/* border: 1px solid black; */
justify-content: start;
`

const ProjectImageDiv = styled.div`
width: 600px;
height: 126px;
/* border: 1px solid black; */
margin-top: 60px;
justify-content: center;
`

const ProjectProcessDate = styled.div`
width: 600px;
height: 25px;
/* border: 1px solid black; */
margin-top: 32px;
flex-direction: row;
justify-content: center;
`

const ProjectProcess = styled.div`
width: 65px;
height: 25px;
/* border: 1px solid black; */
align-items:start;
justify-content: center;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
`
const ProjectProcessDateBar = styled.div`
width: 21px;
height: 25px;
/* border: 1px solid black; */
justify-content:center;
`

const ProjectDate = styled.div`
width: 215px;
height: 25px;
/* border: 1px solid black; */
align-items: start;
justify-content: center;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
`

const ExperienceTitleText = styled.div`
width: 600px;
height: 62px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TitleL};
font-weight: ${(props) => props.theme.fontWeights.TitleL};
justify-content: center;
margin-top: 4px;
flex-direction:row;
`

const ExperienceTitleTextDiv = styled.div`
display: inline-block; 
white-space: nowrap; 
width: fit-content; 
/* height: 62px; */
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TitleL};
font-weight: ${(props) => props.theme.fontWeights.TitleL};
justify-content: center;
margin-top: 4px;
`

const ProjectEdit = styled.div`
width: 42px;
height: 32px;
/* border: 1px solid black; */
color: ${(props) => props.theme.color.main};
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
justify-content: end;
align-items: end;
margin-top: 4px;
text-decoration: underline;
/* margin-left: 10px; */
`

const ProjectGoalDiv = styled.div`
width: 600px;
height: 78px;
/* border: 1px solid black; */
margin-top: 24px;
justify-content: space-between;
`

const ProjectGoalText = styled.div`
width: 600px;
height: 25px;
/* border: 1px solid black; */
justify-content:center;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: 600;
`
const ProjectGoalContents = styled.div`
width: 600px;
height: 46px;
/* border: 1px solid black; */
justify-content:start;
align-items: center;
text-align: center;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
`

const ProjectRole = styled.div`
width: 600px;
height: 25px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: center;
margin-top: 25px;
`

const ProjectRoleText = styled.div`
width: 32px;
height: 25px;
/* border: 1px solid black; */
align-items: start;
justify-content: center;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: 600;
margin-right: 20px;
`

const ProjectRoleContent = styled.div`
display: inline-block; 
white-space: nowrap; 
width: fit-content; 
/* border: 1px solid black; */
align-items: start;
justify-content: center;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
`

const ExperienceButtons = styled.div`
width: 600px;
height: 50px;
/* border: 1px solid black; */
margin-top: 41px;
flex-direction: row;
justify-content: center;
`
const ExperienceButtonsDivDone = styled.div`
width: 465px;
height: 50px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: center;
`

const ExperienceButtonsDiv = styled.div`
width: 465px;
height: 50px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: space-between;
`

const ExperienceTitleRight = styled.div`
width: 300px;
height: 397px;
/* border: 1px solid black; */
align-items: end;
`
const OpenExperienceLinkModal = styled.div`
width: 178px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
flex-direction: row;
color: ${(props) => props.theme.color.white};
background-color: ${(props) => props.theme.color.base7};
justify-content:center;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
`
const DeleteProjectDiv = styled.div`
width: 178px;
height: 25px;
/* border: 1px solid black; */
margin-top: 14px;
`
const DeleteProjectText = styled.div`
width: 147px;
height: 25px;
/* border: 1px solid black; */
text-decoration: underline;
color: #7f7f7f;
font-weight: ${(props) => props.theme.fontWeights.TextM};
`




export default ExperienceTitle;
