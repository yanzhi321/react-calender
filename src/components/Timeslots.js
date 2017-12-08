import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from './static/events';

/*<BigCalendar
          selectable
          events={events}
          defaultView='week'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          
          onSelectEvent={event => {
              let con = prompt(event.title, "的你是不是傻")
              event.title = con
              console.log(event)
            }
          }
          onSelectSlot={(slotInfo) => alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}` +
            `\naction: ${slotInfo.action}`
          )}
          
         
        />*/



let Timeslots = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        step={15}
        timeslots={8}
        defaultView='week'
        defaultDate={new Date(2015, 3, 12)}
      />
    )
  }
})

export default Timeslots;
