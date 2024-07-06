import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../Assets/close.svg";
import Calendar from "../../../Common/Calendar";
import ImageIcon from "../../../Assets/ImageIcon.png";
import { useRef } from "react";
import { postNewProjectAPI } from "../../../Axios/ProjectDataApi";
import { useRecoilState } from "recoil";
import { recoilUserId } from "../../../Atom/UserDataAtom";
import { useEffect } from "react";

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

    const fileInputRef = useRef(null);

    const [projectData, setProjectData] = useState({});
    const [userId, setUserID] = useRecoilState(recoilUserId);

    const userInputHandler = (e) => [
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value,
        })
    ]

    const startDateHandler = (startDate) => [
        setProjectData({
            ...projectData,
            start_date: startDate,
        })
    ]

    const endDateHandler = (endDate) => [
        setProjectData({
            ...projectData,
            end_date: endDate,
        })
    ]

    useEffect(() => {
        setProjectData({
            ...projectData,
            user_id: userId,
        })
    }, [])

    console.log(projectData);

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
        fileInputRef.current.click();
    };

    const fileUploadHandler = (e) => {
        const file = e.target.files[0];
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
            const formData = new FormData();
            formData.append('file', file);

            setProjectData({
                ...projectData,
                picture: file,
                image: picURL,
            })
        }
    }

    const addProjectHandler = async () => {
        try {
            const response = await postNewProjectAPI(projectData);
            console.log(response);
            handleOverlayClick();
        }
        catch (error) {
            console.log(error);
            handleOverlayClick();
        }
        onClose();
    }

    return (
        <Overlay onClick={handleOverlayClick}>
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
                        <ModalProjectTitleInput name="name" onChange={userInputHandler}>

                        </ModalProjectTitleInput>
                    </ModalProjectTitle>
                    <ModalProjectGoal>
                        <ModalProjectGoalText>
                            프로젝트 목표
                            <Asterisk>
                                *
                            </Asterisk>
                        </ModalProjectGoalText>
                        <ModalProjectGoalInput name="description" onChange={userInputHandler}>

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
                            <ModalProjectRoleInput name="part" onChange={userInputHandler}>

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
                                <Calendar name="start_date" setSelectedDate={startDateHandler} />
                                ~
                                <Calendar name="end_date" setSelectedDate={endDateHandler} />

                            </ModalProjectDateCalendar>
                        </ModalProjectDate>

                    </ModalProjectRoleDate>
                    <ModalProjectImage>
                        <ModalProjectImageText>
                            프로젝트 대표 사진
                        </ModalProjectImageText>
                        <ModalProjectImageUpload name="picture" onClick={handleDivClick}>{
                            projectData.image ?
                                <ModalProjectImageUploadContent>
                                    <img
                                        src={projectData.image}
                                        alt="프로젝트 대표 사진"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </ModalProjectImageUploadContent>
                                : <ModalProjectImageUploadContent>  <ModalProjectImageInput type="file" ref={fileInputRef} onChange={fileUploadHandler} />
                                    <ModalProjectImageIcon src={ImageIcon} />
                                    사진 업로드
                                </ModalProjectImageUploadContent>}

                        </ModalProjectImageUpload>
                    </ModalProjectImage>
                    <ModalProjectButtonDiv>
                        <ModalProjectButtons>
                            <ModalProjectAddButton onClick={addProjectHandler}>
                                추가하기
                            </ModalProjectAddButton>
                            <ModalProjectCancelButton name="exit" >
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

const ModalProjectTitleInput = styled.input`
width: 636px;
height: 40px;
border: 1px solid black;
border-radius: 5px;
`;

const ModalProjectGoal = styled.div`
width: 636px;
height: 108px;
/* border: 1px solid black; */
justify-content: space-between;
align-items: start;
margin-bottom: 20px;
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

const ModalProjectGoalInput = styled.input`
width: 636px;
height: 80px;
border: 1px solid black;
border-radius: 5px;
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

const ModalProjectRoleInput = styled.input`
width: 306px;
height: 40px;
border: 1px solid black;
border-radius: 5px;
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

const ModalProjectImage = styled.div`
width: 290px;
height: 68px;
/* border: 1px solid black; */
justify-content: space-between;
align-items: start;
margin-bottom: 12px;
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
width: 138px;
height: 40px;
/* border: 1px solid black; */
background-color: ${(props) => props.theme.colors.Gray};
border-radius: 10px;
flex-direction: row;
justify-content: space-between;
padding-left: 24px;
padding-right: 25px;
box-sizing: border-box;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
cursor: pointer;
`;

const ModalProjectImageUploadContent = styled.div`
width: 89px;
height: 18px;
flex-direction: row;
justify-content: space-between;
box-sizing: content-box;
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight: ${(props) => props.theme.fontWeights.TextS};
`

const ModalProjectImageInput = styled.input`
display:none;
`;

const ModalProjectImageIcon = styled.img`
width: 18px;
height: 18px;
/* border: 1px solid black; */
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
background-color: ${(props) => props.theme.colors.Green};
justify-content: center;
border-radius: 10px;
`;

const ModalProjectCancelButton = styled.button`
width: 64px;
height: 40px;
/* border: 1px solid black; */
font-size: ${(props) => props.theme.fontSizes.TextM};
font-weight: ${(props) => props.theme.fontWeights.TextM};
background-color: ${(props) => props.theme.colors.Gray};
justify-content: center;
border-radius: 10px;
`;

const Asterisk = styled.div`
width: 10px;
height: 23px;
color: ${(props) => props.theme.colors.Green};
justify-content: center;
`

export default AddProjectModal;
