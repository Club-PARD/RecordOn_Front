import styled from "styled-components"



const ProjectCard = () => {

    return (

        <Container>
            <CardContent>
                <CardDate>
                    2024.00.00 ~ 2025.00.00
                </CardDate>
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
height: 244px;
border-radius: 20px;
background-color: #d9d9d9;
justify-content: center;

`
const CardContent = styled.div`
width: 323px;
height: 172px;
/* border: 1px solid black; */
align-items: start;
`

const CardDate = styled.div`
width: 193px;
height: 18px;
/* border: 1px solid black; */
font-style: ${(props) => props.theme.fontStyles.TextS};
/* font-weight: 400; */
`

const CardTitle = styled.div`
width: 323px;
height: 94px;
/* border: 1px solid black; */
font-style: ${(props) => props.theme.fontStyles.TitleS};
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
font-style: ${(props) => props.theme.fontStyles.TextS};
justify-content:center;
margin-right: 10px;
`

export default ProjectCard;