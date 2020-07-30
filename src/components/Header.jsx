import React from 'react';
import styled from 'styled-components';

let StyledHeader = styled.div`
  height: 80px;
  color: darkgreen;
  padding-left: 100px;
  padding-right: 100px;
  margin: 0 auto;
`
let headerLeft = styled.div`

`
let headerRight = styled.div`

`

function Header (props) {
  return (
    <StyledHeader>
      Heading goes here
    </StyledHeader>
  )
}

export default Header