import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from './static/events';

function Event({ event }) {
  return (
    <span>
      <strong>
      {event.title}
      </strong>
      { event.desc && (':  ' + event.desc)}
    </span>
  )
}

function EventAgenda({ event }) {
  return <span>
    <em style={{ color: 'magenta'}}>{event.title}</em>
    <p>{ event.desc }</p>
  </span>
}


let Rendering = React.createClass({
  render(){
    return (
      <div {...this.props}>
        <BigCalendar
          events={events}
          defaultDate={new Date(2015, 3, 1)}
          defaultView='agenda'
          components={{
            event: Event,
            agenda: {
              event: EventAgenda
            }
          }}
        />
      </div>
    )
  }
})

export default Rendering;
