import React from 'react';
import styled from 'styled-components';

let ProjectsContainer = styled.div`
  display: grid;
  grid-column: 1;
  grid-row: 1;
`

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    <ProjectsContainer>
      Projects list will go here
    </ProjectsContainer>
    )
  }
}

export default Projects;