import styled, { css } from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRef, useState } from "react";
import { ko } from "date-fns/locale";
import { useRecoilState } from "recoil";
import { recoilUserProjectFilter } from "../../../Atom/UserDataAtom";
import ResetIcon from "../../../Assets/ResetIcon.svg"
import DropdownArrow from "../../../Assets/DropdownArrow.svg"
import XWhite from "../../../Assets/XWhite.svg"
import { useEffect } from "react";
import { getUserProjectDataFilteredAPI } from "../../../Axios/ProjectDataApi";

const ProjectFilter = () => {

  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  const [projectFilter, setProjectFilter] = useRecoilState(recoilUserProjectFilter);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState([]);
  const keywords = ['신뢰성', '전문성', '책임감', '열정', '실행력', '창의성', '성실성', '정직', '소통/협력'];


  const processOnChange = () => {

    if (projectFilter.is_finished == 2) {
      setProjectFilter({
        ...projectFilter,
        is_finished: 1,
      })
    }
    else if (projectFilter.is_finished == 1) {
      setProjectFilter({
        ...projectFilter,
        is_finished: 2,
      })
    }
  }

  const processOffChange = () => {
    if (projectFilter.is_finished == 2) {
      setProjectFilter({
        ...projectFilter,
        is_finished: 0,
      })
    }
    else if (projectFilter.is_finished == 0) {
      setProjectFilter({
        ...projectFilter,
        is_finished: 2,
      })
    }
    // applyFilter();
  }

  const toggling = () => setIsOpen(!isOpen);

  const addKeyword = value => () => {
    if (!selectedKeyword.includes(value)) {
      setSelectedKeyword(
        [
          ...selectedKeyword,
          value,
        ]
      );
      setProjectFilter({
        ...projectFilter,
        competency_tag_name: [
          ...selectedKeyword,
          value,
        ],
      })
    }
    setIsOpen(false);
    // applyFilter();
    // console.log(value);
  };

  const deleteKeyword = value => () => {
    setSelectedKeyword(
      selectedKeyword.filter(keywords => keywords !== value)
    );
    setProjectFilter({
      ...projectFilter,
      competency_tag_name: selectedKeyword.filter(keywords => keywords !== value),
    })
    // console.log(value);

  };


  const resetDate = () => {
    setProjectFilter({
      ...projectFilter,
      start_date: "",
      finish_date: "",
    })
    setSelectedStartDate("");
    setSelectedEndDate("");

  }

  console.log("프로젝트 필터 ", projectFilter);

  // 드롭다운 외부 클릭시 안보이게 하는 부분들
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // 드롭다운 외부 클릭 이벤트 리스너
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <FilterDiv>
      <FilterLeft>
        <ProjectProcess>
          <ProjectProcessText>
            진행현황
          </ProjectProcessText>
          {{
            0: (
              <ProjectProcessOnOff>
                <ProjectProcessOngoing style={{ backgroundColor: "#303030", color: "white" }} onClick={processOnChange}>
                  진행중
                </ProjectProcessOngoing>
                <ProjectProcessDone style={{ backgroundColor: "white", color: "#303030" }} onClick={processOffChange}>
                  진행완료
                </ProjectProcessDone>
              </ProjectProcessOnOff>
            ),
            1: (
              <ProjectProcessOnOff>
                <ProjectProcessOngoing style={{ backgroundColor: "white", color: "#303030" }} onClick={processOnChange}>
                  진행중
                </ProjectProcessOngoing>
                <ProjectProcessDone style={{ backgroundColor: "#303030", color: "white" }} onClick={processOffChange}>
                  진행완료
                </ProjectProcessDone>
              </ProjectProcessOnOff>
            ),
            2: (
              <ProjectProcessOnOff>
                <ProjectProcessOngoing style={{ backgroundColor: "#303030", color: "white" }} onClick={processOnChange}>
                  진행중
                </ProjectProcessOngoing>
                <ProjectProcessDone style={{ backgroundColor: "#303030", color: "white" }} onClick={processOffChange}>
                  진행완료
                </ProjectProcessDone>
              </ProjectProcessOnOff>
            )
          }[projectFilter.is_finished]}
        </ProjectProcess>
        <ProjectDate>
          <ProjectDateText>
            기간설정
          </ProjectDateText>
          <ProjectDateWrapper>
            <ProjectDateStart
              dateFormat='yyyy.MM.dd'
              shouldCloseOnSelect
              disabledKeyboardNavigation
              placeholderText="시작 날짜"
              minDate={new Date('1980-01-01')}
              maxDate={new Date('2100-12-31')}
              locale={ko}
              selected={selectedStartDate}
              onChange={(date) => {
                setSelectedStartDate(date);
                setProjectFilter({
                  ...projectFilter,
                  start_date: date,
                })
              }}
            />
            <ProjectDateTo>
              ~
            </ProjectDateTo>
            <ProjectDateEnd
              dateFormat='yyyy.MM.dd'
              shouldCloseOnSelect
              disabledKeyboardNavigation
              placeholderText="마무리 날짜"
              minDate={new Date('1980-01-01')}
              maxDate={new Date('2100-12-31')}
              locale={ko}
              selected={selectedEndDate}
              onChange={(date) => {
                setSelectedEndDate(date);
                setProjectFilter({
                  ...projectFilter,
                  finish_date: date,
                })
              }}
            />
          </ProjectDateWrapper>
          <ProjectDateApply onClick={resetDate}>
            <ResetButton src={ResetIcon}></ResetButton>
          </ProjectDateApply>
        </ProjectDate>
      </FilterLeft>
      <FilterRight>
        <ProjectKeyword>
          <ProjectKeywordFilter>
            <ProjectKeywordFilterText>
              핵심역량필터
            </ProjectKeywordFilterText>
            <ProjectKeywordFilterButton>
              <ProjectKeywordFilterDropdownContainer>
                <ProjectKeywordFilterDropdownHeader onClick={toggling}>
                  핵심역량선택
                  <ArrowImage src={DropdownArrow} isRotated={isOpen} />
                </ProjectKeywordFilterDropdownHeader>
                {isOpen && (
                  <ProjectKeywordFilterDropdownListContainer>
                    <ProjectKeywordFilterDropdownList ref={dropdownRef}>
                      {keywords.map(keyword => (
                        <ProjectKeywordFilterListItem onClick={addKeyword(keyword)} key={keyword}>
                          {keyword}
                        </ProjectKeywordFilterListItem>
                      ))}
                    </ProjectKeywordFilterDropdownList>
                  </ProjectKeywordFilterDropdownListContainer>
                )}
              </ProjectKeywordFilterDropdownContainer>
            </ProjectKeywordFilterButton>
          </ProjectKeywordFilter>
          <ProjectKeywordList>
            {selectedKeyword.map(keyword => (
              <ProjectKeywordSelected key={keyword} onClick={deleteKeyword(keyword)}>
                <ProjectKeywordFilterButtonContent>
                  {keyword} <img src={XWhite} />
                </ProjectKeywordFilterButtonContent>
              </ProjectKeywordSelected>
            ))}
          </ProjectKeywordList>
        </ProjectKeyword>
      </FilterRight>
    </FilterDiv>
  );
};

const FilterDiv = styled.div`
width: 1200px;
height: 143px;
/* border: 1px solid black; */
margin-top: 62px;
flex-direction: row;
align-items: start;
justify-content: space-between;
`
const FilterLeft = styled.div`
width: 420px;
height: 91px;
/* border: 1px solid black; */
align-items: start;
justify-content: space-between;
`

const FilterRight = styled.div`
width: 677px;
height: 143px;
/* border: 1px solid black; */
`

const ProjectProcess = styled.div`
width: 290px;
height: 40px;
/* border: 1px solid black; */
align-items: center;
justify-content: start;
flex-direction: row;
`
const ProjectProcessText = styled.div`
width: 78px;
height: 25px;
/* border: 1px solid black; */
align-items: start;
justify-content: center;
`

const ProjectProcessOnOff = styled.div`
flex-direction: row;
width: 212px;
height: 40px;
/* border: 1px solid black; */
`

const ProjectProcessOngoing = styled.div`
width: 98px;
height: 40px;
/* border: 1px solid black; */
justify-content: center;
border-radius: 25px;
color: ${(props) => props.theme.colors.White};
/* background-color: ${(props) => props.theme.colors.Black}; */
box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.10);
`
const ProjectProcessDone = styled.div`
width: 98px;
height: 40px;
/* border: 1px solid black; */
justify-content: center;
border-radius: 25px;
color: ${(props) => props.theme.colors.Black};
background-color: ${(props) => props.theme.color.Gray};
box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.10);
margin-left: 16px;
`

const ProjectDate = styled.div`
width: 420px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
`

const ProjectDateText = styled.div`
width: 78px;
height: 25px;
/* border: 1px solid black; */
align-items: start;
justify-content: center;
`

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
background-color: ${(props) => props.theme.color.white};
text-align: center;
box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.10);
`


const ProjectDateTo = styled.div`
width: 34px;
height: 25px;
/* border: 1px solid black; */
`

const ProjectDateEnd = styled(DatePicker)`
width: 126px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
background-color: ${(props) => props.theme.color.white};
text-align: center;
box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.10);
`

const ProjectDateApply = styled.div`
width: 40px;
height: 40px;
/* border: 1px solid black; */
border-radius: 10px;
align-items: center;
justify-content: center;
background-color: ${(props) => props.theme.color.white};
margin-left: 6px;
box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.10);
`

const ResetButton = styled.img`
width: 20px;
height: 20px;
/* border: 1px solid black; */
cursor: pointer;
`

const ProjectKeyword = styled.div`
width: 677px;
height: 143px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: space-between;
align-items:start;
`

const ProjectKeywordFilter = styled.div`
width: 268px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
`
const ProjectKeywordFilterText = styled.div`
width: 105px;
height: 40px;
/* border: 1px solid black; */
align-items:start;
justify-content:center;
`
const ProjectKeywordFilterButton = styled.div`
width: 164px;
height: 40px;
/* border: 1px solid black; */
`




const ProjectKeywordFilterDropdownContainer = styled.div`
  position: relative;
  width: 164px;
  border-radius: 25px;
`;

const ProjectKeywordFilterDropdownHeader = styled.div`
  width: 164px;
  height:40px;
  flex-direction: row;
  justify-content:center;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.10);
  /* border: 1px solid #ccc; */
  border-radius: 25px;
  cursor: pointer;
`;

const ArrowImage = styled.img`
  margin-left: 7px;
  transition: transform 0.3s ease-in-out;
  ${({ isRotated }) =>
    isRotated &&
    css`
      transform: rotate(-180deg);
    `}

`

const ProjectKeywordFilterDropdownListContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
`;

const ProjectKeywordFilterDropdownList = styled.ul`
width: 164px;
max-height: 169px;
padding: 0;
margin: 45px;
list-style: none;
background: #fff;
border-radius: 5px;
box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.10);
padding: 8px 12px 8px 6px;
overflow-x: hidden;
overflow-y: auto;
position: absolute;
  /* 스크롤바 스타일 (웹킷 브라우저용) */
  &::-webkit-scrollbar {
    width: 5px;
    /* height: 55px; */
    margin-right: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.color.base4}; /* 스크롤바 색상 */
    border-radius: 4px;
  }

`;

const ProjectKeywordFilterListItem = styled.li`
  width: 146px;
  height: 30px;
  padding-left: 15px;
  /* border: 1px solid black; */
  border-radius: 2px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.base3};
  }
   ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.color.base4}; /* 스크롤바 색상 */
  }
`;

const ProjectKeywordList = styled.div`
width: 384px;
height: 143px;
/* border: 1px solid black; */
display: grid;
grid-template-columns: 3fr 3fr 3fr;
grid-template-rows: 3fr 3fr 3fr;
column-gap: 10px;
row-gap: 11px;
`

const ProjectKeywordSelected = styled.div`
width: 122px;
height: 40px;
/* border: 1px solid black; */
justify-content: center;
color: ${(props) => props.theme.color.white};
background-color: ${(props) => props.theme.color.base7};
border-radius: 25px;
`
const ProjectKeywordFilterButtonContent = styled.div`
width: 80px;
height: 40px;
/* border: 1px solid black; */
flex-direction: row;
justify-content: space-between;
`


export default ProjectFilter;
