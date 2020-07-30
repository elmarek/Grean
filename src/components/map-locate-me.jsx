import React from 'react';
import styled from "styled-components";

let StyledButton3 = styled.button`
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 10%;
  max-width: 90px;
  z-index: 10;
  padding-bottom: 3px;
  border: none;
  background-color: transparent;
`;

function Locate({ panTo }) {
  return (
    <StyledButton3
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img
        src="https://fecproductiondescription.s3-us-west-1.amazonaws.com/locateIcon.png"
        alt="compass"
      />
    </StyledButton3>
  );
}

export default Locate