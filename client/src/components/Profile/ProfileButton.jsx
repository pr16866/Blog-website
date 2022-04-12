import React from 'react'
import styled from 'styled-components';
const Profilebutton = styled.div`

`

export default function ProfileButton({ number,name}) {
  // console.log(number);
  return (
    <Profilebutton>
      <div style={{cursor:"pointer"}}>
        <h3 className="number">{number>9?number:"0"+number }</h3>
        <h3 className="number-title">{ name}</h3>
      </div>
    </Profilebutton>
  );
}
