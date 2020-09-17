import React from 'react';
import EventsListItem from './EventsListItem.jsx'
import styled from 'styled-components';

const EventList = styled.ul`
  display: grid;
  grid-column: 1/3;
  padding: 0px;
`

const EventsList = (props) => {
  console.log(props.events)
  return (
    <EventList>
      {props.events.map((event) => (
        <EventsListItem key={event._id} event={event} />
      ))}
    </EventList>
  )
}

export default EventsList