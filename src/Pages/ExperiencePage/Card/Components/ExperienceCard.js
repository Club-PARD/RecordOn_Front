import styled from "styled-components"
// import DefaultCardImg from "../../../Assets/Experience_Default.png"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { recoilUserData } from "../../../../Atom/UserDataAtom";


const ExperienceCard = ({ experienceData }) => {

    const [userImg, setUserImg] = useState("");
    const navigate = useNavigate();
    const [userData, setUserData] = useRecoilState(recoilUserData);
    const [allowNavigate, setAllowNavigate] = useState(false);

    const keyword = [...new Set(experienceData.tag_name)];

    const cardClickHandler = () => {
        setUserData({
            ...userData,
            id: experienceData.experience_id,
        })
        setAllowNavigate(true);
    }

    useEffect(() => {
        if (allowNavigate) {
            navigate("/view");
        }
    }, [allowNavigate])

    // console.log(key);
    // console.log(experienceData);
    // console.log(keyword);


    return (

        <Container onClick={cardClickHandler}>
            <CardContent>
                <CardDate>
                    {experienceData.exp_date?.substring(0, 10)}
                </CardDate>
                <CardTitle>
                    {experienceData.experience_name}
                </CardTitle>
                <ExperienceKeywordDiv>
                    {keyword.includes("도전") ?
                        <ExperienceKeyword borderColor="#2ABCDC">
                            도전
                        </ExperienceKeyword>
                        :
                        <ExperienceKeyword borderColor="#7F7F7F">
                            도전
                        </ExperienceKeyword>
                    }
                    {keyword.includes("어려움") ?
                        <ExperienceKeyword borderColor="#FF971D">
                            어려움
                        </ExperienceKeyword>
                        :
                        <ExperienceKeyword borderColor="#7F7F7F">
                            어려움
                        </ExperienceKeyword>
                    }
                    {keyword.includes("성공") ?
                        <ExperienceKeyword borderColor="#4B9EFF">
                            성공
                        </ExperienceKeyword>
                        :
                        <ExperienceKeyword borderColor="#7F7F7F">
                            성공
                        </ExperienceKeyword>
                    }
                    {keyword.includes("실패") ?
                        <ExperienceKeyword borderColor="#F25454">
                            실패
                        </ExperienceKeyword>
                        :
                        <ExperienceKeyword borderColor="#7F7F7F">
                            실패
                        </ExperienceKeyword>
                    }
                    {keyword.includes("배움") ?
                        <ExperienceKeyword borderColor="#42B887">
                            배움
                        </ExperienceKeyword>
                        :
                        <ExperienceKeyword borderColor="#7F7F7F">
                            배움
                        </ExperienceKeyword>
                    }
                </ExperienceKeywordDiv>
            </CardContent>
        </Container>
    )

}

const Container = styled.div`
width: 384px;
height: 290px;
border-radius: 20px;
background-color: ${(props) => props.theme.color.white};
justify-content: center;
box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.10);
cursor: pointer;
user-select : none;
`
const CardContent = styled.div`
width: 312px;
height: 212px;
/* border: 1px solid black; */
align-items: start;
`

const CardDate = styled.div`
width: 193px;
height: 18px;
align-items: start;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
/* font-weight: 400; */
`

const CardTitle = styled.div`
width: 312px;
height: 94px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TitleM};
font-weight: ${(props) => props.theme.fontWeights.TitleM};
line-height: 130%;
margin-top: 6px;
align-items: start;
`

const ExperienceKeywordDiv = styled.div`
width: 262px;
height: 70px;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
column-gap: 14px;
row-gap: 10px;
/* border: 1px solid black; */
margin-top: 24px;
flex-direction:row;
align-items: start;
`

const ExperienceKeyword = styled.div`
width: 78px;
height: 30px;
border: 1.5px solid ${(props) => props.borderColor};
border-radius: 20px;
color: ${(props) => props.borderColor};
font-size: ${(props) => props.theme.fontSizes.TextS};
justify-content: center;
`

export default ExperienceCard;