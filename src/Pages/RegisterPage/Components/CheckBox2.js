import React , { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Check } from "../../../Assets/Check.svg";

function CheckBox2({ name, onSelect }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
        <StyledInput type="checkbox" name={name} checked={isChecked} onChange={handleCheckboxChange} />
        {isChecked && <StyledCheck />}
    </>
  );
}

// const StyledLabel = styled.label`
//   display: flex;
//   align-items: center;
//   user-select: none;
// `;

const StyledInput = styled.input`
  appearance: none;
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 2px;
  border: 0.8px solid ${(props) => props.theme.colors.Black};
  cursor: pointer;
  z-index: 20000;
`;


const StyledCheck =styled(Check)`
  position: absolute;
  width: 12px;
  height: 9px;
  top: 5px;
  left: 4px;
  flex-shrink: 0;
`;

export default CheckBox2;



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