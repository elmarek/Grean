import React from 'react';
import styled from 'styled-components';
import ProjectsList from './ProjectsList.jsx';
import EventsList from './EventsList.jsx';

let ProjectsContainer = styled.div`
  display: grid;
  grid-column: 1;
  grid-row: 1;
`
let StyledTab = styled.button`
  display: grid;
  grid-row: 1;
  background-color: black;
  color: white;
  max-width: 100px;
  max-height: 50px;
`

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      events: [],
      isLoaded: false,
      eventsView: false
    }
    this.viewEvents = this.viewEvents.bind(this)
    this.viewProjects = this.viewProjects.bind(this)
  }
  viewEvents(e) {
    e.preventDefault();
    fetch('http://localhost:3000/events')
      .then(res => res.json())
      .then((events) => {
        this.setState({
          events: events,
          isLoaded: true,
          eventsView: true
        })
      })
  }
  viewProjects(e) {
    e.preventDefault();
    this.setState({
      eventsView: false
    })
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
    if (this.state.isLoaded && !this.state.eventsView) {
      return (
        <ProjectsContainer>
          <StyledTab onClick={((e) => this.viewProjects(e))}>
            Projects
          </StyledTab>
          <StyledTab onClick={((e) => this.viewEvents(e))}>
            Events
          </StyledTab>
          <ProjectsList projects={this.state.projects.slice(0,5)} />
        </ProjectsContainer>
      )
    } else if (this.state.isLoaded && this.state.eventsView) {
      return (
        <ProjectsContainer>
          <StyledTab onClick={((e) => this.viewProjects(e))}>
            Projects
          </StyledTab>
          <StyledTab onClick={((e) => this.viewEvents(e))}>
            Events
          </StyledTab>
          <EventsList events={this.state.events.slice(0,5)} />
        </ProjectsContainer>
      )
    } else {
      return (
        <ProjectsContainer></ProjectsContainer>
      )
    }
  }
}

export default Projects;