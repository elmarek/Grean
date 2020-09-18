import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import styled from "styled-components";

let StyledForm = styled.form`
z-index: 10;

width: 100px;
height: 500px;
`




class CreateProject extends Component {
  constructor (props) {
  super(props)
  this.state = {
   email: '',
   name: '',
    password: ''
  }

}

ChangeHandler (event) {

  const name = event.target.name;
  const value = event.target.value;

  this.setState({
    formControls: {
        ...this.state.formControls,
        [name]: {
        ...this.state.formControls[name],
        value
      }
    }
  });
}
 render(){ return (
    <form>

    <input type="email"
           name="email"
           value={this.state.email}
           onChange={this.changeHandler}
    />

    <input type="text"
           name="name"
           value={this.state.name}
           onChange={this.changeHandler}
    />

    <input type="password"
           name="password"
           value={this.state.password}
           onChange={this.changeHandler}
    />

</form>
  );


  // setMarkers((current) => [
  //   ...current,
  //   {
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //     time: new Date(),
  //   },
  // ]);
 }
}

export default CreateProject