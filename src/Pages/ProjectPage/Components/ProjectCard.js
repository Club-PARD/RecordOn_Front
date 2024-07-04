import styled from "styled-components"
import DefaultCardImg from "../../../Assets/Project_Default.png"
import { useState } from "react";


const ProjectCard = () => {

    const [userImg, setUserImg] = useState("");

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
                            2024.00.00 ~ 2025.00.00
                        </CardDate>

                    </CardDateDiv>
                </CardTopDiv>
                <CardTitle>
                    한동대 해커톤이라고요
                    레코드온의 경험기록임
                </CardTitle>
                <ProjectKeywordDiv>
                    <ProjectKeyword>
                        신뢰성
                    </ProjectKeyword>
                    <ProjectKeyword>
                        신뢰성
                    </ProjectKeyword>
                    <ProjectKeyword>
                        신뢰성
                    </ProjectKeyword>
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
font-style: ${(props) => props.theme.fontSizes.TextS};
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
font-style: ${(props) => props.theme.fontSizes.TextS};
/* font-weight: 400; */
`

const CardDateText = styled.div`
width: 193px;
height: 40px;
align-items: start;
/* border: 1px solid black; */
font-style: ${(props) => props.theme.fontSizes.TextS};
/* font-weight: 400; */
`

const CardDate = styled.div`
width: 193px;
height: 40px;
align-items: start;
/* border: 1px solid black; */
font-style: ${(props) => props.theme.fontSizes.TextS};
/* font-weight: 400; */
`

const CardTitle = styled.div`
width: 323px;
height: 94px;
/* border: 1px solid black; */
font-style: ${(props) => props.theme.fontSizes.TitleS};
margin-top: 6px;
/* box-sizing: content-box; */
`

const ProjectKeywordDiv = styled.div`
width: 323px;
height: 30px;
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
font-style: ${(props) => props.theme.fontSizes.TextS};
justify-content:center;
margin-right: 10px;
`

export default ProjectCard;