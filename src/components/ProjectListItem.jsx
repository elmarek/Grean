import React from 'react';
import styled from 'styled-components';

const Project = styled.div`
  border: solid black 1px;
  margin: 3px;
`

const Name = styled.div`
  color: black;
  font-family: Helvetica;
  font-size: 20px;
  padding: 5px;
`
const Description = styled.div`
  color: black;
  font-family: Helvetica;
  font-size: 14px;
  padding: 7px;
`

const ProjectListItem = (props) => {
  return (
    <Project>
      <Name>{props.project.name}</Name>
      <Description>{props.project.description.slice(0,100)} ...</Description>
    </Project>
  )
}

export default ProjectListItem;