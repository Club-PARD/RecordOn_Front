import styled from "styled-components"
import DefaultCardImg from "../../../Assets/Project_Default.png"
import DefaultCardImg2 from "../../../Assets/Project_Default2.png"
import ProjectFolder from "../../../Assets/ProjectFolder.png"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { recoilUserData, recoilUserExperienceFilter } from "../../../Atom/UserDataAtom";
import { expEditState, experienceState } from "../../../Atom/ExpRecordAtom";
import { useNavigate } from "react-router-dom";


const ProjectCard = ({ projectData }) => {


    const keyword = [...new Set(projectData.competency_tag_name)];
    const [experienceFilter, setExperienceFilter] = useRecoilState(recoilUserExperienceFilter);
    const [userData, setUserData] = useRecoilState(recoilUserData);
    const navigate = useNavigate();
    const [experienceStateRecoil, setExperienceStateRecoil] = useRecoilState(experienceState);
    const [expEditStateRecoil, setExpEditStateRecoil] = useRecoilState(expEditState);
    const [allowNavigate, setAllowNavigate] = useState(false);


    const projectCardClickHandler = () => {
        setExperienceFilter({
            ...experienceFilter,
            project_id: projectData.project_id,
        });
        console.log(userData);
        console.log({
            ...userData,
            project_id: projectData.project_id,
        });
        console.log(userData);
        setUserData({
            ...userData,
            project_id: projectData.project_id,
        })
        setExperienceStateRecoil({
            ...experienceStateRecoil,
            projects_id: projectData.project_id,
        })
        setExpEditStateRecoil({
            ...expEditStateRecoil,
            projects_id: projectData.project_id,
        })
        setAllowNavigate(true);
    }

    useEffect(() => {
        if (allowNavigate) {
            navigate("/experience");
        }
    }, [allowNavigate])

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

        <Container backGroundImg={ProjectFolder} onClick={projectCardClickHandler}>
            {projectData.is_finished == 1 ?
                <CardContent>
                    <CardTopDiv>
                        <CardImageDiv>
                            <CardImage src={projectData.project_image == null || projectData.project_image == "" ? DefaultCardImg2 : projectData.project_image} />
                        </CardImageDiv>
                        <CardDateDiv>
                            <CardDateText>
                                프로젝트 진행 기간
                            </CardDateText>
                            <CardDate>
                                {projectData.start_date?.substring(0, 10)} ~ {projectData.finish_date?.substring(0, 10)}
                            </CardDate>

                        </CardDateDiv>
                    </CardTopDiv>
                    <CardTitle>
                        {projectData.project_name}
                    </CardTitle>
                    <ProjectKeywordDiv>
                        {keyword.slice(0, 3).map(tag => (
                            <ProjectKeyword>
                                {tag}
                            </ProjectKeyword>
                        ))}
                    </ProjectKeywordDiv>
                </CardContent>
                :
                <CardContent>
                    <CardTopDiv>
                        <CardImageDiv>
                            <CardImage src={projectData.project_image == null || projectData.project_image == "" ? DefaultCardImg : projectData.project_image} />
                        </CardImageDiv>
                        <CardDateDiv>
                            <CardDateText>
                                프로젝트 진행 기간
                            </CardDateText>
                            <CardDate>
                                {projectData.start_date?.substring(0, 10)} ~ {projectData.finish_date?.substring(0, 10)}
                            </CardDate>

                        </CardDateDiv>
                    </CardTopDiv>
                    <CardTitle>
                        {projectData.project_name}
                    </CardTitle>
                    <ProjectKeywordDiv2>
                        # 당신의 멋진 프로젝트가 기록되는 중입니다!
                    </ProjectKeywordDiv2>
                </CardContent>
            }


        </Container>
    )

}

const Container = styled.div`
width: 384px;
height: 304px;
/* border: 1px solid #bbbbbb; */
justify-content: center;
background-image: url(${(props) => props.backGroundImg});
background-size: cover;
background-position: center;
cursor: pointer;
user-select : none;
`
const CardContent = styled.div`
width: 334px;
height: 242px;
/* border: 1px solid black; */
align-items: start;
`

const CardTopDiv = styled.div`
width: 334px;
height: 77px;
flex-direction:row;
justify-content:space-between;
align-items: end;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextS};
`

const CardImageDiv = styled.div`
width: 77px;
height: 77px;
align-items: start;
/* border: 1px solid black; */
`

const CardImage = styled.img`
width: 77px;
height: 77px;
border-radius: 100px;
/* border: 1px solid black; */
`

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
`

const CardDateText = styled.div`
width: 193px;
height: 40px;
align-items: start;
/* border: 1px solid black; */
color: ${(props) => props.theme.color.base6};
`

const CardDate = styled.div`
width: 221px;
height: 40px;
align-items: start;
/* border: 1px solid black; */
color: ${(props) => props.theme.color.black};
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
/* font-weight: 400; */
`

const CardTitle = styled.div`
width: 334px;
height: 85px;
/* border: 1px solid black; */
color: ${(props) => props.theme.color.black};
font-size: ${(props) => props.theme.fontSizes.TitleM};
font-weight: ${(props) => props.theme.fontWeights.TitleM};
line-height: 130%;
margin-top: 20px;
align-items: start;
`

const ProjectKeywordDiv = styled.div`
width: 262px;
height: 30px;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(1, 1fr);
column-gap: 14px;
/* border: 1px solid black; */
margin-top: 30px;
flex-direction:row;
align-items: start;
`

const ProjectKeywordDiv2 = styled.div`
width: 321px;
height: 40px;
/* border: 1px solid black; */
margin-top: 29px;
flex-direction:row;
align-items: start;
color: ${(props) => props.theme.color.main};
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
`

const ProjectKeyword = styled.div`
width: 78px;
height: 30px;
/* border: 1px solid black; */
border-radius: 25px;
color: ${(props) => props.theme.color.white};
background-color: ${(props) => props.theme.color.main};
font-size: ${(props) => props.theme.fontSizes.TextS};
justify-content:center;
/* margin-right: 10px; */
`

export default ProjectCard;