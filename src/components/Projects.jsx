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
      isLoaded: false
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/projects')
      .then(res => res.json())
      .then((projects) => {
        console.log('I got the projects: ', projects[0])
        this.setState({
          projects: projects,
          isLoaded: true
        })
      })
  }
  render() {
    //console.log('projects: ', this.state.projects)
    if (this.state.isLoaded) {
      return (
        <div>Hello, world</div>
      )
    } else {
      return (
        <ProjectsContainer></ProjectsContainer>
      )
    }
  }
}

export default Projects;