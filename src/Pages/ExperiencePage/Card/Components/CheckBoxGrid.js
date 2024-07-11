import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { recoilUserData, recoilUserProjectFilter } from "../../../../Atom/UserDataAtom";
import { putProjectTagAPI } from "../../../../Axios/ProjectDataApi";
import { useNavigate } from "react-router-dom";


const CheckboxGrid = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const [userData, setUserData] = useRecoilState(recoilUserData);
  const [projectFilter, setProjectFilter] = useRecoilState(recoilUserProjectFilter);
  const navigate = useNavigate();

  const putProjectTagHandler = async () => {
    try {
      const response = await putProjectTagAPI(userData, checkedItems);
      console.log('Checkboxes Put:', checkedItems);
      console.log(response + "///");
      setProjectFilter({
        ...projectFilter,
        competency_tag_name: [],
        start_date: "",
        finish_date: "",
        is_finished: 2,
      })
      navigate("/project");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const index = parseInt(name.split('-')[1], 10);
    if (checked) {
      // If less than 3 items are checked, add the new item
      if (checkedItems.length < 3) {
        setCheckedItems([...checkedItems, index]);
      }
    } else {
      // Remove the unchecked item
      setCheckedItems(checkedItems.filter(item => item !== index));
    }
  };

  useEffect(() => {
    console.log('Selected checkboxes:', checkedItems);
  }, [checkedItems]);

  const isFormValid = (checkedItems.length === 0);

  const checkboxes = [
    '소통', '신뢰성', '전문성',
    '책임감', '열정', '실행력',
    '창의성', '성실성', '정직'
  ];
  return (
    <Div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {checkboxes.map((checkbox, index) => (
          <label key={checkbox}>
            <CheckInput
              type="checkbox"
              name={`checkbox-${index + 1}`}
              checked={checkedItems.includes(index + 1)}
              onChange={handleCheckboxChange}
              disabled={!checkedItems.includes(index + 1) && checkedItems.length >= 3}
            />
            <TagDiv checked={checkedItems.includes(index + 1)}>{checkbox}</TagDiv>
          </label>
        ))}
      </div>
      <RegisterBtn disabled={isFormValid} onClick={putProjectTagHandler}>
        프로젝트 완료
      </RegisterBtn>
    </Div>
  );
};

export default CheckboxGrid;

const Div = styled.div`
  display: flex;
width: 230px;
height: 109px;
justify-content: center;
align-items: center;
align-content: center;
color: ${(props) => props.theme.color.black};
font-size: ${(props) => props.theme.fontSizes.TextS};
font-weight : ${(props) => props.theme.fontWeights.TextS};

`;

const RegisterBtn = styled.button`
  display: flex;
  width: 180px;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: ${(props) => props.theme.color.main};
  border-radius: 10px;

  position: absolute;
  top: 303.37px;
  color: ${(props) => props.theme.colors.White};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.TextM};
  font-weight : ${(props) => props.theme.fontWeights.TextM};
  line-height: normal;
  cursor: pointer;

  &:disabled {
    background: ${(props) => props.theme.color.base6};
    cursor: not-allowed;
  }
`;

const CheckInput = styled.input`
  position: absolute;
  border-radius: 25px;
  width: 70px;
  height: 30px;
  flex-shrink: 0;
  justify-content: center;
  cursor: pointer;

  
`;

const TagDiv = styled.div`
  /* position: absolute; */
  border: 1px solid black;
  border-radius: 25px;
  display: flex;
width: 70px;
height: 30px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
color : ${(props) => props.theme.color.black};
  background: ${(props) => props.theme.color.white};

  ${CheckInput}:hover + &{
  border: 1px solid ${(props) => props.theme.color.main};
  color : ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.color.main};
  cursor: pointer;
  }

${CheckInput}:checked + &{
  border: 1px solid ${(props) => props.theme.color.main};
  color : ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.color.main};
  cursor: pointer;
  }
  

`;