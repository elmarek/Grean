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
      projects: [],
    }
  }
  componentDidMount() {
    fetch('/projects')
      .then((res) => {res.json()})
      .then((projects) => {
        this.setState({
          projects: projects
        })
      })
  }
  render() {
    console.log('projects: ', this.state.projects)
    return (
    <ProjectsContainer>
      {this.state.projects}
    </ProjectsContainer>
    )
  }
}

export default Projects;