// import React, { useState } from "react";
// import CheckBox from "./CheckBox";
// import CheckTag from "./CheckTag";
// function SelectTag () {
//   const checkList = [...Array(5).fill("체크").map((v, i) => v + i)]

//   const [checkItems, setCheckItems] = useState(new Set);

//   const checkItemHandler = (id, isChecked) => {
//     if (isChecked) {
//       checkItems.add(id) 
//       setCheckItems(checkItems)
//       console.log(checkItems)
//     } else if (!isChecked) {
//       checkItems.delete(id)
//       setCheckItems(checkItems)
//     }
//   };

//   return (
//     <>
//       <header>
//       </header>
//       <div>
//         {
//           checkList.map((issue, index) => (
//             <CheckTag
//       key={index}
//       text={text}
//       id={`id`+index}
//       checkItemHandler={checkItemHandler} // props로 함수전달
//       />
//           ))
//         }
//       </div>
//     </>
//   )
// }

// export default SelectTag;