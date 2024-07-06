import styled from "styled-components"
import DefaultCardImg from "../../../Assets/Project_Default.png"
import { useState } from "react";


const ProjectCard = ({ projectData }) => {

    const [userImg, setUserImg] = useState("");


    // console.log(key);
    console.log(projectData);

    return (

        <Container>
            <CardContent>
                <CardTopDiv>
                    <CardImageDiv>
                        <CardImage src={userImg == "" ? DefaultCardImg : DefaultCardImg} />
                    </CardImageDiv>
                    <CardDateDiv>
                        <CardDateText>
                            프로젝트 진행 기간
                        </CardDateText>
                        <CardDate>
                            {projectData.start_date.substring(0, 10)} ~ {projectData.finish_date.substring(0, 10)}
                        </CardDate>

                    </CardDateDiv>
                </CardTopDiv>
                <CardTitle>
                    {projectData.project_name}
                </CardTitle>
                <ProjectKeywordDiv>
                    {projectData.competency_tag_name.map(tag => (
                        <ProjectKeyword>
                            {tag}
                        </ProjectKeyword>
                    ))}
                    {/* <ProjectKeyword>
                        신뢰성
                    </ProjectKeyword>
                    <ProjectKeyword>
                        신뢰성
                    </ProjectKeyword>
                    <ProjectKeyword>
                        신뢰성
                    </ProjectKeyword> */}
                </ProjectKeywordDiv>
            </CardContent>

        </Container>
    )

}

const Container = styled.div`
width: 384px;
height: 272px;
border-radius: 20px;
border: 1px solid #bbbbbb;
/* background-color: #d9d9d9; */
justify-content: center;

`
const CardContent = styled.div`
width: 327px;
height: 208px;
/* border: 1px solid black; */
align-items: start;
`

const CardTopDiv = styled.div`
width: 319px;
height: 50px;
flex-direction:row;
justify-content:space-between;
align-items: center;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextS};
/* font-weight: 400; */
`

const CardImageDiv = styled.div`
width: 50px;
height: 50px;
align-items: start;
/* border: 1px solid black; */
`

const CardImage = styled.img`
width: 50px;
height: 50px;
border-radius: 25px;
/* border: 1px solid black; */
`

const CardDateDiv = styled.div`
width: 233px;
height: 40px;
align-items: start;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextS};
/* font-weight: 400; */
`

const CardDateText = styled.div`
width: 193px;
height: 40px;
align-items: start;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextS};
/* font-weight: 400; */
`

const CardDate = styled.div`
width: 193px;
height: 40px;
align-items: start;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextS};
/* font-weight: 400; */
`

const CardTitle = styled.div`
width: 323px;
height: 94px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TitleM};
font-weight: ${(props) => props.theme.fontWeights.TitleM};
line-height: 130%;
margin-top: 6px;
align-items: start;
`

const ProjectKeywordDiv = styled.div`
width: 254px;
height: 30px;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(1, 1fr);
column-gap: 10px;
/* border: 1px solid black; */
margin-top: 24px;
flex-direction:row;
align-items: start;
`

const ProjectKeyword = styled.div`
width: 78px;
height: 30px;
background-color: black;
/* border: 1px solid black; */
border-radius: 25px;
color: ${(props) => props.theme.colors.White};
font-size: ${(props) => props.theme.fontSizes.TextS};
justify-content:center;
/* margin-right: 10px; */
`

export default ProjectCard;