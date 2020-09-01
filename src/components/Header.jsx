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
  max-width: 125px;
  max-height: 50px;
  background-color: #11ffee00;
  color: #008145;
  font-family: Helvetica;
  font-size: 20px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 6px;
  padding-right: 6px;
  margin: 5px;
  border: 0px;
  border-radius: 2px;
  &:hover,
  &:focus {
    outline: none;
    border: 1px solid #008145;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 5px;
    padding-right: 5px;
  }
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