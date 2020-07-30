import React from 'react';
import Map from './Map.jsx'
import Header from './Header.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Header />
        <Map />
      </div>
    )
  }
}

export default App;