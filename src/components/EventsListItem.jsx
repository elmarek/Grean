import React from 'react';
import styled from 'styled-components';

const Event = styled.div`
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
const Date = styled.div`
  color: black;
  font-family: Helvetica;
  font-size: 14px;
  padding: 7px;
`

const EventsListItem = (props) => {
  return (
    <Event>
      <Name>{props.event.name}</Name>
      <Date>{props.event.date_start}</Date>
      <Description>{props.event.description}</Description>
    </Event>
  )
}

export default EventsListItem