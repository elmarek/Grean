import React from 'react';
import styled from 'styled-components';
import Logo1 from '../../Grean1.png';

let StyledHeader = styled.div`
  height: 80px;
  color: #008145;
  padding-left: 80px;
  padding-right: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: white;
`
let HeaderLeft = styled.div`
  font-size: 80px;
  font-family: Verdana;
  color: #008145;
  font-weight: 600;
  padding-top: 8px;
`

let LogoButton = styled.div`
  width: 240px;
  height: 57px
`
let HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
let StyledButton = styled.button`
  max-width: 100px;
  max-height: 50px;
  background-color: #11ffee00;
  color: #008145;
  font-family: Helvetica;
  font-size: 20px;
  padding-bottom: 3px;
  margin: 3px;
  border: 0px;
`

function Header (props) {
  return (
    <StyledHeader>
      <HeaderLeft>
        <LogoButton className='logo-button'></LogoButton>
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