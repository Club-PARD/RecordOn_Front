import styled from "styled-components";
import AddExperience from "./AddExperience";
import { useState } from "react";
// import { getUserExperienceDataAPI } from "../../../Axios/ExperienceDataApi";
import { useRecoilState } from "recoil";
import { recoilUserId, recoilUserExperienceNum } from "../../../Atom/UserDataAtom";
import { useEffect } from "react";
import ArrowGray from "../../../Assets/GoBackIcon.svg"
import ArrowWhite from "../../../Assets/ArrowWhite.svg"
import BarIcon from "../../../Assets/BarIcon.svg"
import Project_Default from "../../../Assets/Project_Default.png"
import DeleteProject from "./DeleteProject";

const ExperienceTitle = () => {

    const [userId, setUserId] = useRecoilState(recoilUserId);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const getData = async () => {
            // const response = await getUserExperienceDataAPI(userId);
            // // console.log(response.user_name);
            // setUserName(response.user_name);
        }
        getData();

    }, [])


    return (
        <ExperienceTitleDiv>
            <ExperienceTitleLeft>
                <BackToProject>
                    <img src={ArrowGray} style={{ width: "14px", marginRight: "7px" }} />
                    메인 페이지로 돌아가기
                </BackToProject>
            </ExperienceTitleLeft>
            <ExperienceTitleCenter>
                <ProjectImageDiv>
                    <img src={Project_Default} style={{ width: "126px" }} />
                </ProjectImageDiv>
                <ProjectProcessDate>
                    <ProjectProcess>
                        진행중
                    </ProjectProcess>
                    <ProjectProcessDateBar>
                        <img src={BarIcon} style={{ height: "15px" }} />
                    </ProjectProcessDateBar>
                    <ProjectDate>
                        2024.00.00~2025.00.00
                    </ProjectDate>
                </ProjectProcessDate>
                <ExperienceTitleText>
                    {/* {userName} */}
                    해커톤 프로젝트
                </ExperienceTitleText>
                <ProjectGoalDiv>
                    <ProjectGoalText>
                        프로젝트 목표
                    </ProjectGoalText>
                    <ProjectGoalContents>
                        내용 70자 미만 내용 70자 미만 내용 70자 미만 내용 70자 미만 내용 70자 미만 내용 70자 미만 내용 70자 미만 내용 70자 미만 내용 70자 미만 내용 70자 미만
                    </ProjectGoalContents>
                </ProjectGoalDiv>
                <ProjectRole>
                    <ProjectRoleText>
                        역할
                    </ProjectRoleText>
                    <ProjectRoleContent>
                        디자이너
                    </ProjectRoleContent>
                </ProjectRole>
                <ExperienceButtons>
                    <ExperienceButtonsDiv>
                        <AddExperience />
                        <DeleteProject />
                    </ExperienceButtonsDiv>
                </ExperienceButtons>
            </ExperienceTitleCenter>
            <ExperienceTitleRight>
                <OpenExperienceLinkModal>
                    관련 자료 링크
                    <img src={ArrowWhite} style={{ width: "10px", marginLeft: "7px" }} />
                </OpenExperienceLinkModal>
                <DeleteProjectDiv>
                    <DeleteProjectText>
                        프로젝트 삭제하기
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
border: 1px solid black;
justify-content: space-between;
align-items:start;
`
const ExperienceTitleLeft = styled.div`
width: 300px;
height: 552px;
border: 1px solid black;
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
border: 1px solid black;
justify-content: start;
`

const ProjectImageDiv = styled.div`
width: 600px;
height: 126px;
border: 1px solid black;
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
width: 191px;
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
justify-content:center;
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
width: 64px;
height: 25px;
/* border: 1px solid black; */
align-items: start;
justify-content: center;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: 600;
`

const ProjectRoleContent = styled.div`
width: 118px;
height: 25px;
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
color: ${(props) => props.theme.colors.White};
background-color: ${(props) => props.theme.colors.Black};
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
