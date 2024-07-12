import styled from "styled-components";
import { useState } from "react";
import CloseIcon from "../../../Assets/close.svg";
import Calendar from "../../../Common/Calendar";
import ImageIcon from "../../../Assets/ImageIcon.svg";
import { useRef } from "react";
import { postNewProjectAPI, postNewProjectImageAPI } from "../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilSnack, recoilUserData, recoilUserExperienceFilter } from "../../../Atom/UserDataAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale";
import { answerState, experienceState } from "../../../Atom/ExpRecordAtom";



const AddProjectModal = ({
    isOpen,
    onClose,
    bigAlertText1,
    bigAlertText2,
    smallAlertText,
    keepButtonText,
    deleteButtonText,
    onKeep,
    onDelete,
}) => {

    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const fileInputRef = useRef(null);
    const [projectData, setProjectData] = useState({});
    const [userData, setUserData] = useRecoilState(recoilUserData);
    const [projectId, setProjectID] = useRecoilState(recoilUserExperienceFilter);
    const [experienceFilter, setExperienceFilter] = useRecoilState(recoilUserExperienceFilter);
    const [experienceStateRecoil, setExperienceStateRecoil] = useRecoilState(experienceState);
   const [answerStateRecoil, setAnswerStateRecoil] = useRecoilState(answerState);
    const [snack, setSnack] = useRecoilState(recoilSnack);

    const [valid, setValid] = useState(false);
    const navigate = useNavigate();


    const userInputHandler = (e) => [
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value,
        })
    ]

    const startDateHandler = (startDate) => {
        setSelectedStartDate(startDate);
        setProjectData({
            ...projectData,
            start_date: startDate,
        })
    }

    const finishDateHandler = (finishDate) => {
        setSelectedEndDate(finishDate);
        setProjectData({
            ...projectData,
            finish_date: finishDate,
        })
    }

    useEffect(() => {
        setProjectData({
            ...projectData,
            user_id: userData.user_id,
        })
    }, [])

    console.log(projectData);

    useEffect(() => {
        if (projectData.name !== undefined && projectData.description !== undefined && projectData.part !== undefined && projectData.start_date !== undefined && projectData.finish_date !== undefined && projectData.name?.length !== 0 && projectData.description?.length !== 0 && projectData.part?.length !== 0 && projectData.start_date?.length !== 0 && projectData.finish_date?.length !== 0 && projectData?.name !== null && projectData?.description !== null && projectData?.part !== null && projectData?.start_date !== null && projectData?.finish_date !== null) {
            setValid(true);
        }
        else {
            setValid(false);
        }
    }, [projectData])

    if (!isOpen) return null;

    //오버레이 영역 선택하면 모달 닫힘
    const handleOverlayClick = (e) => {
        // console.log(e.target, e.currentTarget);
        if (e?.target === e?.currentTarget) {
            onClose();
        }
        else if (e?.target.name == "exit") {
            onClose();
        }
    };


    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const fileUploadHandler = (e) => {
        // console.log(e.target.files);
        const file = e.target.files[0];
        // console.log(file);
        if (file) {

            const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validFileTypes.includes(file.type)) {
                alert('유효하지 않은 파일 형식입니다. 이미지 파일만 업로드할 수 있습니다.');
                return;
            }

            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSizeInBytes) {
                alert('파일 크기가 너무 큽니다. 5MB 이하의 파일만 업로드할 수 있습니다.');
                return;
            }

            e.preventDefault();
            e.persist();

            const picURL = URL.createObjectURL(file);

            // console.log(picURL);

            setProjectData({
                ...projectData,
                picture: file,
                image: picURL,
            })
        }
        fileInputRef.current.value = null;
    }

    const addProjectHandler = async () => {
        if (valid) {
            if (projectData.start_date > projectData.finish_date) {
                alert("프로젝트 시작일이 종료일보다 늦습니다. 진행기간을 다시 확인 후, 재설정해주세요.");
                return 0;
            }
            try {
                console.log(projectData);
                const response = await postNewProjectAPI(projectData);
                console.log(response);
                console.log(response.response_object.id);
                setProjectID(response.response_object.id);
                setUserData({
                    ...userData,
                    project_id: response.response_object.id,
                })
                setExperienceFilter({
                    ...experienceFilter,
                    project_id: response.response_object.id,
                })
                setExperienceStateRecoil({
                    ...experienceStateRecoil,
                    projects_id: response.response_object.id,
                })
                setAnswerStateRecoil({
                    ...answerStateRecoil,
                    projects_id: projectData.project_id,
                })
                console.log(experienceFilter);
                if (projectData.picture !== undefined) {
                    const formData = new FormData();
                    formData.append('image', projectData.picture);
                    const response2 = await postNewProjectImageAPI(formData, response.response_object.id);
                    console.log(response2);
                }
                handleOverlayClick();
                setSnack({
                    ...snack,
                    projectAdd: true,
                });
                navigate("/experience");
            }
            catch (error) {
                console.log(error);
                handleOverlayClick();
            }
            onClose();
        }

    }


    const handleRawChange = (event) => {
        const inputValue = event.target.value;
        // 입력값이 숫자 8자리인지 확인
        if (/^\d{8}$/.test(inputValue)) {
            // yyyyMMdd 형식을 yyyy.MM.dd 형식으로 변환
            const formattedDate = `${inputValue.slice(0, 4)}.${inputValue.slice(4, 6)}.${inputValue.slice(6, 8)}`;
            event.target.value = formattedDate;
        }
    };

    return (
        <Overlay >
            <Modal>
                <ModalContentDiv>
                    <ModalText>
                        프로젝트 추가
                    </ModalText>
                    <ModalProjectTitle>
                        <ModalProjectTitleText>
                            프로젝트명
                            <Asterisk>
                                *
                            </Asterisk>
                        </ModalProjectTitleText>
                        <ModalProjectTitleInput name="name" onChange={userInputHandler} placeholder="15자 이내로 입력해주세요.">

                        </ModalProjectTitleInput>
                    </ModalProjectTitle>
                    <ModalProjectGoal>
                        <ModalProjectGoalText>
                            프로젝트 목표
                            <Asterisk>
                                *
                            </Asterisk>
                        </ModalProjectGoalText>
                        <ModalProjectGoalInput name="description" onChange={userInputHandler} placeholder="프로젝트 내 팀의 목표 또는 개인의 목표를 짧게 남겨주세요! &#13;&#10;70자 이내로 입력해주세요.">

                        </ModalProjectGoalInput>
                    </ModalProjectGoal>
                    <ModalProjectRoleDate>
                        <ModalProjectRole>
                            <ModalProjectRoleText>
                                역할
                                <Asterisk>
                                    *
                                </Asterisk>
                            </ModalProjectRoleText>
                            <ModalProjectRoleInput name="part" onChange={userInputHandler} placeholder="10자 이내로 입력해주세요.">

                            </ModalProjectRoleInput>
                        </ModalProjectRole>
                        <ModalProjectDate>
                            <ModalProjectDateText>
                                진행기간
                                <Asterisk>
                                    *
                                </Asterisk>
                            </ModalProjectDateText>
                            <ModalProjectDateCalendar>
                                <ProjectDateWrapper>
                                    <ProjectDateStart
                                        dateFormat='yyyy.MM.dd'
                                        shouldCloseOnSelect
                                        disabledKeyboardNavigation
                                        placeholderText="YYYY.MM.DD"
                                        minDate={new Date('1980-01-01')}
                                        maxDate={new Date('2100-12-31')}
                                        locale={ko}
                                        selected={selectedStartDate}
                                        onChange={(date) => {
                                            startDateHandler(date);
                                        }}
                                        onChangeRaw={handleRawChange}
                                    />
                                    <ProjectDateTo>
                                        ~
                                    </ProjectDateTo>
                                    <ProjectDateEnd
                                        dateFormat='yyyy.MM.dd'
                                        shouldCloseOnSelect
                                        disabledKeyboardNavigation
                                        placeholderText="YYYY.MM.DD"
                                        minDate={new Date('1980-01-01')}
                                        maxDate={new Date('2100-12-31')}
                                        locale={ko}
                                        selected={selectedEndDate}
                                        onChange={(date) => {
                                            finishDateHandler(date);
                                        }}
                                        onChangeRaw={handleRawChange}
                                    />
                                </ProjectDateWrapper>

                            </ModalProjectDateCalendar>
                        </ModalProjectDate>

                    </ModalProjectRoleDate>
                    <ModalProjectImage>
                        <ModalProjectImageText>
                            프로젝트 대표 이미지
                        </ModalProjectImageText>
                        <ModalProjectImageUpload name="picture" >{
                            projectData.image ?
                                <ModalProjectImageUploadLeft>
                                    <ModalProjectImageUploadContent onClick={handleDivClick}>
                                        <img
                                            src={projectData.image}
                                            alt="프로젝트 대표 사진"
                                            style={{ width: '18px', height: '18px', objectFit: 'cover', marginLeft: "24px", marginRight: "7px" }}
                                        />
                                        <ModalProjectImageNameDiv>
                                            {projectData.picture.name}
                                        </ModalProjectImageNameDiv>
                                        <ModalProjectImageInput type="file" ref={fileInputRef} onChange={fileUploadHandler} />
                                    </ModalProjectImageUploadContent>
                                    <ModalProjectImageDelete onClick={() => {
                                        setProjectData({
                                            ...projectData,
                                            picture: undefined,
                                            image: undefined,

                                        });
                                    }}>
                                        <img src={CloseIcon} style={{ width: "12px" }} />
                                    </ModalProjectImageDelete>
                                </ModalProjectImageUploadLeft>
                                :
                                <ModalProjectImageUploadContent2 onClick={handleDivClick}>
                                    <ModalProjectImageInput type="file" ref={fileInputRef} onChange={fileUploadHandler} />
                                    <ModalProjectImageIcon src={ImageIcon} />
                                    이미지 업로드
                                </ModalProjectImageUploadContent2>}

                        </ModalProjectImageUpload>
                    </ModalProjectImage>
                    <ModalProjectButtonDiv>
                        <ModalProjectButtons>
                            <ModalProjectAddButton onClick={addProjectHandler} isValid={valid}>
                                추가하기
                            </ModalProjectAddButton>
                            <ModalProjectCancelButton name="exit" onClick={handleOverlayClick}>
                                취소
                            </ModalProjectCancelButton>
                        </ModalProjectButtons>
                    </ModalProjectButtonDiv>
                </ModalContentDiv>
            </Modal>
        </Overlay>
    );
};


const Overlay = styled.div`
display: flex;
align-items: center;
justify-content: center;
z-index: 999998; /* Modal보다 뒤에 배치 */

position: fixed;
top: 0;
left: 0;

width: 100%;
height: 100%;

background: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;

width: 792px;
height: 600px;
z-index: 999999;

border-radius: 16px;
background-color: ${(props) => props.theme.colors.White};
`;

const ModalContentDiv = styled.div`
width: 638px;
height: 492px;
/* border: 1px solid black; */
align-items: start;

`;

const ModalText = styled.div`
width: 164px;
height: 39px;
/* border: 1px solid black; */
align-items: start;
justify-content:center;
font-size: ${(props) => props.theme.fontSizes.TitleS};
font-weight: ${(props) => props.theme.fontWeights.TitleS};
margin-bottom: 27px;
`;

const ModalProjectTitle = styled.div`
width: 636px;
height: 68px;
/* border: 1px solid black; */
justify-content: space-between;
align-items: start;
margin-bottom: 21px;
`;

const ModalProjectTitleText = styled.div`
width: 91px;
height: 23px;
/* border: 1px solid black; */
align-items: center;
justify-content:space-between;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
flex-direction:row;
`;

const ModalProjectTitleInput = styled.input.attrs({
    maxLength: 15
})`
width: 636px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
background-color: ${(props) => props.theme.color.base2};
padding: 11px 16px;
box-sizing: border-box;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
line-height: 18.2px;
letter-spacing: -0.28px;
&::placeholder {
    color: ${(props) => props.theme.color.base6};
  }
`;

const ModalProjectGoal = styled.div`
width: 636px;
height: 88px;
/* border: 1px solid black; */
justify-content: space-between;
align-items: start;
margin-bottom: 22px;
`;

const ModalProjectGoalText = styled.div`
width: 110px;
height: 23px;
/* border: 1px solid black; */
align-items: center;
justify-content:space-between;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
flex-direction:row;
`;

const ModalProjectGoalInput = styled.textarea.attrs({
    maxLength: 70
})`
width: 636px;
height: 60px;
border-radius: 10px;
background-color: ${(props) => props.theme.color.base2};
padding: 11px 16px;
box-sizing: border-box;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
line-height: 18.2px;
letter-spacing: -0.28px;
&::placeholder {
    color: ${(props) => props.theme.color.base6};
    white-space: pre-wrap;
  }
`;

const ModalProjectRoleDate = styled.div`
width: 636px;
height: 68px;
flex-direction: row;
/* border: 1px solid black; */
justify-content: space-between;
align-items: start;
margin-bottom: 21px;
`;

const ModalProjectRole = styled.div`
width: 306px;
height: 68px;
/* border: 1px solid black; */
justify-content: space-between;
align-items: start;
`;

const ModalProjectRoleText = styled.div`
width: 45px;
height: 23px;
/* border: 1px solid black; */
align-items: center;
justify-content:space-between;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
flex-direction:row;
`;

const ModalProjectRoleInput = styled.input.attrs({
    maxLength: 10
})`
    width: 306px;
    height: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.color.base2};
    padding: 11px 16px;
    box-sizing: border-box;
    font-size: ${(props) => props.theme.fontSizes.TextS};
    font-weight: ${(props) => props.theme.fontWeights.TextS};
    line-height: 18.2px;
    letter-spacing: -0.28px;
    &::placeholder {
      color: ${(props) => props.theme.color.base6};
    }
  `;

const ModalProjectDate = styled.div`
width: 286px;
height: 68px;
/* border: 1px solid black; */
justify-content: space-between;
align-items: start;
`;

const ModalProjectDateText = styled.div`
width: 76px;
height: 23px;
/* border: 1px solid black; */
align-items: center;
justify-content:space-between;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
flex-direction:row;
`;

const ModalProjectDateCalendar = styled.div`
width: 286px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: space-between;
`;

const ProjectDateWrapper = styled.div`
width: 286px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: start;


/* DatePicker에 직접 하면 적용이 안된다.. */
.react-datepicker {
    background-color: ${(props) => props.theme.colors.white}; 
    width: 300px;
    align-items: center;
    justify-content: center;
    font-style: ${(props) => props.theme.fontSizes.TextS};
    border-radius: 15px;
    
  }
  
  .react-datepicker__header {
    background-color: ${(props) => props.theme.color.white}; 
    width: 250px;
    font-size: 15px;
    font-family: "Pretendard";
    border: 0px;
    
    /* border: 1px solid black; */
  }

  .react-datepicker__current-month {
    /* width: 150px; */
    height: 20px;
    flex-direction: row;
    justify-content: space-between;
    font-family: "Pretendard";
    font-style: ${(props) => props.theme.fontSizes.TextL};
    margin-top: 15px;
    margin-bottom: 15px;
    /* border: 1px solid black; */
  }
  .react-datepicker__navigation--previous{
    margin-top: 15px;
    
  }

  .react-datepicker__navigation--next{
    margin-top: 15px;
  }

  .react-datepicker__day-names {
    width: 250px;
    height: 20px;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    /* margin-bottom: -20px; */
    /* border: 1px solid black; */
  }

  .react-datepicker__day-name {
    font-size: 15px;
    color: #aaaaaa;
    align-items: center;
    justify-content: center;
    font-family: "Pretendard";
    /* border: 1px solid black; */
  }
  
  .react-datepicker__month-container {
    width: 100%;
  }
  

  .react-datepicker__week {
    display: flex;
    flex-direction: row;
    width: 250px;
    /* justify-content: space-between; */
    /* border: 1px solid black; */
  }

  .react-datepicker__day {
    width: 30px;
    height: 30px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444444;
    /* border: 1px solid black; */
  }

  .react-datepicker__day--selected {
    background-color: ${(props) => props.theme.color.main}; 
    border-radius: 15px;
    color: white;
  }
  .react-datepicker__triangle {
      display: none;
    }

  .react-datepicker__day--outside-month {
    cursor: default;
    visibility: hidden;
  }


`

const ProjectDateStart = styled(DatePicker)`
width: 126px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
background-color: ${(props) => props.theme.color.base2};
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
line-height: 18.2px;
letter-spacing: -0.28px;
text-align: center;
`


const ProjectDateTo = styled.div`
width: 34px;
height: 25px;
font-size: ${(props) => props.theme.fontSizes.TextL};
font-weight: ${(props) => props.theme.fontWeights.TextL};
line-height: 26px;
letter-spacing: -0.4px;
/* border: 1px solid black; */
`

const ProjectDateEnd = styled(DatePicker)`
width: 126px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
background-color: ${(props) => props.theme.color.base2};
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
line-height: 18.2px;
letter-spacing: -0.28px;
text-align: center;
`

const ModalProjectImage = styled.div`
width: 306px;
height: 68px;
/* border: 1px solid black; */
justify-content: space-between;
align-items: start;
margin-bottom: 30px;
`;

const ModalProjectImageText = styled.div`
width: 290px;
height: 23px;
/* border: 1px solid black; */
align-items: start;
justify-content:center;
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
`;

const ModalProjectImageUpload = styled.div`
width: 306px;
height: 40px;
/* border: 1px solid black; */
background-color: ${(props) => props.theme.color.base2};
border-radius: 10px;
flex-direction: row;
justify-content: start;
box-sizing: border-box;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};

text-overflow: ellipsis;
`;

const ModalProjectImageUploadLeft = styled.div`
width: 306px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: start;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
/* margin-left: 24px; */
`

const ModalProjectImageUploadContent = styled.div`
width: 260px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: start;
box-sizing: content-box;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
cursor: pointer;

`

const ModalProjectImageUploadContent2 = styled.div`
width: 306px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: start;
box-sizing: content-box;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
cursor: pointer;

`

const ModalProjectImageNameDiv = styled.div`
width: 236px;
height: 18px;
flex-direction: row;
/* border: 1px solid black; */
align-items: start;
justify-content: space-between;
white-space: nowrap; 
overflow: hidden;
text-overflow: ellipsis;
`
const ModalProjectImageName = styled.div`
width: 210px;
height: 18px;
flex-direction: row;
/* border: 1px solid black; */
align-items: center;
`;

const ModalProjectImageDelete = styled.div`
width: 40px;
height: 40px;
/* border: 1px solid black; */
align-items: center;
justify-content: center;
cursor: pointer;
`;

const ModalProjectImageInput = styled.input`
display:none;
`;

const ModalProjectImageIcon = styled.img`
width: 18px;
height: 18px;
/* border: 1px solid black; */
margin-left: 24px;
margin-right: 7px;
`;

const ModalProjectButtonDiv = styled.div`
width: 638px;
height: 40px;
/* border: 1px solid black; */
`;

const ModalProjectButtons = styled.div`
width: 176px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: space-between;
`;

const ModalProjectAddButton = styled.button`
width: 102px;
height: 40px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
color: ${(props) => props.theme.colors.White};
background-color: ${(props) => (props.isValid ? props.theme.color.main : props.theme.color.base6)};
justify-content: center;
border-radius: 10px;
cursor: pointer;
`;

const ModalProjectCancelButton = styled.button`
width: 64px;
height: 40px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
color: ${(props) => props.theme.color.base6};
background-color: ${(props) => props.theme.color.base3};
justify-content: center;
border-radius: 10px;
cursor: pointer;
`;

const Asterisk = styled.div`
width: 10px;
height: 23px;
color: ${(props) => props.theme.color.fail};
justify-content: center;
`

export default AddProjectModal;
