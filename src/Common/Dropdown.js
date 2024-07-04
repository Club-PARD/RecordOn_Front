import styled from "styled-components";
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";

const Dropdown = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedKeyword, setSelectedKeyword] = useState([]);
    const keywords = ['1', '2', '3'];


    const toggling = () => setIsOpen(!isOpen);

    const addKeyword = value => () => {
        if (!selectedKeyword.includes(value)) {
            setSelectedKeyword(
                [
                    ...selectedKeyword,
                    value,
                ]
            );
        }
        setIsOpen(false);
        // console.log(value);
    };


    return (
        <>
            <ProjectKeywordFilterButton>
                <ProjectKeywordFilterDropdownContainer>
                    <ProjectKeywordFilterDropdownHeader onClick={toggling}>
                        text
                    </ProjectKeywordFilterDropdownHeader>
                    {isOpen && (
                        <ProjectKeywordFilterDropdownListContainer>
                            <ProjectKeywordFilterDropdownList>
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
        </>
    );
};


const ProjectKeywordFilterButton = styled.div`
width: 164px;
height: 40px;
/* border: 1px solid black; */
`

const ProjectKeywordFilterDropdownContainer = styled.div`
  position: relative;
  width: 164px;
  background-color: ${(props) => props.theme.colors.Gray};
  border-radius: 25px;
`;

const ProjectKeywordFilterDropdownHeader = styled.div`
  /* padding: 10px; */
  width: 164px;
  height:40px;
  justify-content:center;
  background-color: ${(props) => props.theme.colors.Gray};
  /* border: 1px solid #ccc; */
  border-radius: 25px;
  cursor: pointer;
`;

const ProjectKeywordFilterDropdownListContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
`;

const ProjectKeywordFilterDropdownList = styled.ul`
  width: 164px;
  padding: 0;
  margin: 45px;
  list-style: none;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  /* border-top: none; */
`;

const ProjectKeywordFilterListItem = styled.li`
  padding: 10px;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background: ${(props) => props.theme.colors.Green};
  }
`;





export default Dropdown;
