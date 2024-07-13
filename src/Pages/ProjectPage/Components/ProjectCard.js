import styled, { keyframes } from "styled-components";
import DefaultCardImg from "../../../Assets/Project_Default.png";
import DefaultCardImg2 from "../../../Assets/Project_Default.svg";
import ProjectFolder from "../../../Assets/ProjectFolder.png";
import FolderDone from "../../../Assets/FolderDone.svg";
import FolderOn from "../../../Assets/FolderOn.svg";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
    recoilUserData,
    recoilUserExperienceFilter,
    recoilUserProjectDate,
} from "../../../Atom/UserDataAtom";
import { answerState, experienceState } from "../../../Atom/ExpRecordAtom";
import { useNavigate } from "react-router-dom";


const ProjectCard = ({ projectData }) => {
    const keyword = [...new Set(projectData.competency_tag_name)];
    const [experienceFilter, setExperienceFilter] = useRecoilState(
        recoilUserExperienceFilter
    );
    const [userData, setUserData] = useRecoilState(recoilUserData);
    const navigate = useNavigate();
    const [experienceStateRecoil, setExperienceStateRecoil] =
        useRecoilState(experienceState);
    const [answerStateRecoil, setAnswerStateRecoil] = useRecoilState(answerState);
    const [projectDate, setProjectDate] = useRecoilState(recoilUserProjectDate);
    const [allowNavigate, setAllowNavigate] = useState(false);

    // console.log("답변 상태", answerStateRecoil);


    const projectCardClickHandler = () => {
        setExperienceFilter({
            ...experienceFilter,
            project_id: projectData.project_id,
        });
        // console.log(userData);
        // console.log({
        //     ...userData,
        //     project_id: projectData.project_id,
        // });
        // console.log(userData);
        setUserData({
            ...userData,
            project_id: projectData.project_id,
        });
        setExperienceStateRecoil({
            ...experienceStateRecoil,
            projects_id: projectData.project_id,
        });
        setAnswerStateRecoil({
            ...answerStateRecoil,
            projects_id: projectData.project_id,
        });
        // setProjectDate({
        //     start_date: projectData.stazrt_date,
        //     finish_date: projectData.finish_date,
        // })
        setAllowNavigate(true);
    };

    useEffect(() => {
        if (allowNavigate) {
            navigate("/experience");
        }
    }, [allowNavigate]);

    // const navigateToExperience = async () => {
    //     const response = await projectCardClickHandler();
    //     console.log(response);
    //     console.log(experienceStateRecoil);
    //     navigate("/experience");
    // }

    // console.log(key);
    // console.log(projectData);
    // console.log(keyword);

    return (
        <>

            {projectData.is_finished == 1 ? (
                <Container backGroundImg={FolderDone} onClick={projectCardClickHandler}>
                    <CardContent>
                        <CardTopDiv>
                            <CardImageDiv>
                                <CardImage
                                    src={
                                        projectData.project_image == null ||
                                            projectData.project_image == ""
                                            ? DefaultCardImg2
                                            : projectData.project_image
                                    }
                                />
                            </CardImageDiv>
                            <CardDateDiv>
                                <CardDateText>프로젝트 진행 기간</CardDateText>
                                <CardDate>
                                    {projectData.start_date?.substring(0, 10)} ~{" "}
                                    {projectData.finish_date?.substring(0, 10)}
                                </CardDate>
                            </CardDateDiv>
                        </CardTopDiv>
                        <CardTitle>{projectData.project_name}</CardTitle>
                        <ProjectKeywordDiv>
                            {keyword.slice(0, 3).map((tag) => (
                                <ProjectKeyword>{tag}</ProjectKeyword>
                            ))}
                        </ProjectKeywordDiv>
                    </CardContent>
                </Container>
            ) : (
                <Container backGroundImg={FolderOn} onClick={projectCardClickHandler}>
                    <CardContent2>
                        <CardTopDiv2>
                            <CardImageDiv2>
                                <CardImage2
                                    src={
                                        projectData.project_image == null ||
                                            projectData.project_image == ""
                                            ? DefaultCardImg2
                                            : projectData.project_image
                                    }
                                />
                            </CardImageDiv2>
                            <CardDateDiv2>
                                <CardDateText2>프로젝트 진행 기간</CardDateText2>
                                <CardDate2>
                                    {projectData.start_date?.substring(0, 10)} ~{" "}
                                    {projectData.finish_date?.substring(0, 10)}
                                </CardDate2>
                            </CardDateDiv2>
                        </CardTopDiv2>
                        <CardTitle2>{projectData.project_name}</CardTitle2>
                    </CardContent2>
                </Container>
            )}

        </>
    );
};

const mouseHover = keyframes` 
  0% {
    -webkit-transform: scale(1.0);
            transform: scale(1.0);
  }
  100% {
    -webkit-transform: scale(1.05);
            transform: scale(1.05);
  }
`;

const Container = styled.div`
  width: 384px;
  height: 304px;
  /* border: 1px solid #bbbbbb; */
  justify-content: end;
  background-image: url(${(props) => props.backGroundImg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  user-select: none;
  /* animation: ${mouseHover} 0.3s forwards; */
  &:hover {
    animation: ${mouseHover} 0.2s forwards;
  }

`;
const CardContent = styled.div`
  width: 334px;
  height: 244px;
  /* border: 1px solid black; */
  align-items: start;
  margin-bottom: 27px;
`;

const CardTopDiv = styled.div`
  width: 332px;
  height: 77px;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  /* border: 1px solid black; */
  font-size: ${(props) => props.theme.fontSizes.TextS};
`;

const CardImageDiv = styled.div`
  width: 77px;
  height: 77px;
  align-items: start;
  /* border: 1px solid black; */
`;

const CardImage = styled.img`
  width: 77px;
  height: 77px;
  border-radius: 100px;
  /* border: 1px solid black; */
  object-fit: cover;
`;

const CardDateDiv = styled.div`
  width: 221px;
  height: 40px;
  align-items: start;
  /* border: 1px solid black; */
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  line-height: 23.4px;
  letter-spacing: -0.36px;
`;

const CardDateText = styled.div`
  width: 193px;
  height: 18px;
  align-items: start;
  justify-content: end;
  /* border: 1px solid black; */
  color: ${(props) => props.theme.color.base6};
  font-size: ${(props) => props.theme.fontSizes.TextS};
  font-weight: ${(props) => props.theme.fontWeights.TextS};
`;

const CardDate = styled.div`
  width: 221px;
  height: 20px;
  align-items: start;
  justify-content: end;
  /* border: 1px solid black; */
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  /* font-weight: 400; */
`;

const CardTitle = styled.div`
  width: 334px;
  height: 85px;
  /* border: 1px solid black; */
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSizes.TitleM};
  font-weight: ${(props) => props.theme.fontWeights.TitleM};
  line-height: 130%;
  margin-top: 22px;
  align-items: start;
  white-space: pre-wrap;
`;

const ProjectKeywordDiv = styled.div`
  width: 262px;
  height: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  column-gap: 14px;
  /* border: 1px solid black; */
  margin-top: 30px;
  flex-direction: row;
  align-items: start;
`;

const ProjectKeyword = styled.div`
  width: 78px;
  height: 30px;
  /* border: 1px solid black; */
  border-radius: 25px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.base7};
  font-size: ${(props) => props.theme.fontSizes.TextS};
  justify-content: center;
  /* margin-right: 10px; */
`;






const CardContent2 = styled.div`
  width: 334px;
  height: 184px;
  /* border: 1px solid black; */
  align-items: start;
  margin-bottom: 47px;
`;

const CardTopDiv2 = styled.div`
  width: 334px;
  height: 77px;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  /* border: 1px solid black; */
  font-size: ${(props) => props.theme.fontSizes.TextS};
`;

const CardImageDiv2 = styled.div`
  width: 77px;
  height: 77px;
  align-items: start;
  /* border: 1px solid black; */
`;

const CardImage2 = styled.img`
  width: 77px;
  height: 77px;
  border-radius: 100px;
  /* border: 1px solid black; */
  object-fit: cover;
`;

const CardDateDiv2 = styled.div`
  width: 221px;
  height: 40px;
  align-items: start;
  /* border: 1px solid black; */
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  line-height: 23.4px;
  letter-spacing: -0.36px;
`;

const CardDateText2 = styled.div`
  width: 193px;
  height: 18px;
  align-items: start;
  justify-content: end;
  /* border: 1px solid black; */
  color: ${(props) => props.theme.color.base6};
`;

const CardDate2 = styled.div`
  width: 221px;
  height: 20px;
  align-items: start;
  justify-content: end;
  /* border: 1px solid black; */
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
  /* font-weight: 400; */
`;

const CardTitle2 = styled.div`
  width: 334px;
  height: 85px;
  /* border: 1px solid black; */
  color: ${(props) => props.theme.color.black};
  font-size: ${(props) => props.theme.fontSizes.TitleM};
  font-weight: ${(props) => props.theme.fontWeights.TitleM};
  line-height: 130%;
  margin-top: 20px;
  align-items: start;
`;

const ProjectKeywordDiv2 = styled.div`
  width: 262px;
  height: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  column-gap: 14px;
  /* border: 1px solid black; */
  margin-top: 30px;
  flex-direction: row;
  align-items: start;
`;

const ProjectKeywordDiv22 = styled.div`
  width: 321px;
  height: 40px;
  /* border: 1px solid black; */
  margin-top: 29px;
  flex-direction: row;
  align-items: start;
  color: ${(props) => props.theme.color.main};
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight: ${(props) => props.theme.fontWeights.TextM};
`;

const ProjectKeyword2 = styled.div`
  width: 78px;
  height: 30px;
  /* border: 1px solid black; */
  border-radius: 25px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.main};
  font-size: ${(props) => props.theme.fontSizes.TextS};
  justify-content: center;
  /* margin-right: 10px; */
`;



export default ProjectCard;
