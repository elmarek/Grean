import React from 'react';
import Map from './Map.jsx';
import Header from './Header.jsx';
import Projects from './Projects.jsx';
import styled from 'styled-components';

let AppContainer = styled.div`

`
let MainView = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  grid-template-rows: auto;
  padding-left: 50px;
  padding-right: 50px;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <AppContainer>
        <Header />
        <MainView>
          <Projects />
          <Map />
        </MainView>
      </AppContainer>
    )
  }
}

export default App;