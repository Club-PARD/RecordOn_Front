import styled from "styled-components"
// import DefaultCardImg from "../../../Assets/Experience_Default.png"
import { useState } from "react";


const ExperienceCard = ({ experienceData }) => {

    const [userImg, setUserImg] = useState("");

    const keyword = [...new Set(experienceData.tag_name)];


    // console.log(key);
    console.log(experienceData);
    // console.log(keyword);

    return (

        <Container>
            {experienceData.is_finished == 1 ?
                <CardContent>
                    <CardTopDiv>
                        <CardImageDiv>
                        </CardImageDiv>
                        <CardDateDiv>
                            <CardDateText>
                                프로젝트 진행 기간
                            </CardDateText>
                            <CardDate>
                                {experienceData.start_date.substring(0, 10)} ~ {experienceData.finish_date.substring(0, 10)}
                            </CardDate>

                        </CardDateDiv>
                    </CardTopDiv>
                    <CardTitle>
                        {experienceData.experience_name}
                    </CardTitle>
                    <ExperienceKeywordDiv>
                        {keyword.slice(0, 3).map(tag => (
                            <ExperienceKeyword>
                                {tag}
                            </ExperienceKeyword>
                        ))}
                    </ExperienceKeywordDiv>
                </CardContent>
                :
                <CardContent>
                    <CardTopDiv>
                        <CardImageDiv>
                        </CardImageDiv>
                        <CardDateDiv>
                            <CardDateText>
                                프로젝트 진행 기간
                            </CardDateText>
                            <CardDate>
                                {experienceData.exp_date.substring(0, 10)}
                            </CardDate>

                        </CardDateDiv>
                    </CardTopDiv>
                    <CardTitle>
                        {experienceData.experience_name}
                    </CardTitle>
                    <ExperienceKeywordDiv2>
                        # 당신의 멋진 프로젝트가 기록되는 중입니다!
                    </ExperienceKeywordDiv2>
                </CardContent>
            }


        </Container>
    )

}

const Container = styled.div`
width: 384px;
height: 272px;
border-radius: 20px;
border: 1px solid #bbbbbb;
background-color: #d9d9d9;
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
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
/* font-weight: 400; */
`

const CardDate = styled.div`
width: 233px;
height: 40px;
align-items: start;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
/* font-weight: 400; */
`

const CardTitle = styled.div`
width: 327px;
height: 85px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TitleM};
font-weight: ${(props) => props.theme.fontWeights.TitleM};
line-height: 130%;
margin-top: 14px;
align-items: start;
`

const ExperienceKeywordDiv = styled.div`
width: 254px;
height: 30px;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(1, 1fr);
column-gap: 10px;
/* border: 1px solid black; */
margin-top: 29px;
flex-direction:row;
align-items: start;
`

const ExperienceKeywordDiv2 = styled.div`
width: 284px;
height: 40px;
/* border: 1px solid black; */
margin-top: 29px;
flex-direction:row;
align-items: start;
font-size: ${(props) => props.theme.fontSizes.TextS};
`

const ExperienceKeyword = styled.div`
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

export default ExperienceCard;