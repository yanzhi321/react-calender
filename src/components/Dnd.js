import React from 'react'
import events from './static/events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: events
    }

    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent({ event, start, end }) {

    console.log(event)
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })

    console.log(events)
    //alert(`${event.title} was dropped onto ${event.start}`);
  }

  render(){
    return (

      <DragAndDropCalendar
        selectable={true}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        defaultView='day'
        defaultDate={new Date(2015, 3, 21)}

        onSelecting={(slotInfo) => {
            let eleSlot = document.querySelector('.rbc-slot-selection span')
            console.log(eleSlot)
            
        }}

        showMultiDayTimes={true}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
