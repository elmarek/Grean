import React from 'react';
import styled from 'styled-components';

let StyledHeader = styled.div`
  height: 120px;
  color: darkgreen;
  padding-left: 80px;
  padding-right: 80px;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  background-color: seagreen;
`
let HeaderLeft = styled.div`
  font-size: 80px;
  font-family: Verdana;
  color: #F1F1F1;
  font-weight: 600;
  padding-bottom: 5px;
`
let HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
let StyledButton = styled.button`
  max-width: 100px;
  max-height: 50px;
  background-color: #F1F1F1;
  color: seagreen;
  font-family: Helvetica;
  font-size: large;
  font-weight: bold;
  border-radius: 5px;
  border: solid 1px Gainsboro;
  padding-bottom: 3px;
  margin: 3px;
`

function Header (props) {
  return (
    <StyledHeader>
      <HeaderLeft>
        Grean
      </HeaderLeft>
      <HeaderRight>
        <StyledButton>
          About Us
        </StyledButton>
        <StyledButton>
          Login
        </StyledButton>
        <StyledButton>
          Sign Up
        </StyledButton>
      </HeaderRight>
    </StyledHeader>
  )
}

export default Header