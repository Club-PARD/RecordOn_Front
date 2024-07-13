import React, { useState } from "react";
import styled from "styled-components";
import Check from "../../../Assets/Check.svg";

function CheckBox({ id, onSelect }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // console.log(id + "isChecked: " + isChecked);

  return (
    <Div>
      <StyledInput type="checkbox" id={id} checked={isChecked} onChange={handleCheckboxChange} />
      <Boxlabel htmlFor={id}></Boxlabel>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
`;

const Boxlabel = styled.label`

  width: 100px;
  height: 20px;

`;

const StyledInput = styled.input`
  display: flex;
  appearance: none;
  position: absolute;
  /* position: relative; */
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 2px;
  border: 0.8px solid ${(props) => props.theme.colors.Black};
  cursor: pointer;
  background-size: cover; 
  
  &:checked + ${Boxlabel} {
    background-repeat: no-repeat;
    background-image: url(${Check});
    background-position: left;
    background-position-x: 5px;
    background-size: 12px;
  }

`;



const StyledCheck = styled(Check)`
  position: absolute;
  width: 12px;
  height: 9px;
  top: 5px;
  left: 4px;
  flex-shrink: 0;
`;

export default CheckBox;



// const CheckBox = () => {
//   return (
//     <CheckboxDiv checked={checked}>
//       <StyledCheck />
//     </CheckboxDiv>
//   );
// };

// const CheckboxDiv = styled.div`
//   position: relative;
//   width: 20px;
//   height: 20px;
//   flex-shrink: 0;
//   border-radius: 2px;
//   border: 0.8px solid ${(props) => props.theme.colors.Black};
//   ${StyledCheck} {
// 		visibility: ${props=>props.checked? 'visible': 'hidden'};
// 	}
// `;