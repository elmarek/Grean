import React from 'react';
import ProjectListItem from './ProjectListItem.jsx';
import styled from 'styled-components';

const ProjectList = styled.ul`
  display: grid;
  grid-column: 1/3;
  padding: 0px;
`

const ProjectsList = (props) => {
  //console.log('project list here')
  return (
    <ProjectList>
      {props.projects.map(project => (
        <ProjectListItem key={project._id} project={project} />
      ))}
    </ProjectList>
  )
}

export default ProjectsList