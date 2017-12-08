import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from './static/events';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

function apm(ele){

  let hour = ele.getHours() 
  let hours = ele.getHours() >= '12' ?  'PM ' + ele.getHours()  : 'AM ' + ele.getHours()
  let minute = ele.getMinutes() < '10' ? '0' + ele.getMinutes() : ele.getMinutes()

  let senconds = ele.getSeconds() < '10' ? '0' + ele.getSeconds() : ele.getSeconds()

  return parseInt(hour + ':' + minute) >= '12' ? (hour + ':' + minute) + 'PM' : (hour + ':' + minute) + 'AM '
}


let dateEvents = [
  {
    'title': 'All Day Event very long title',
    'start': new Date(2017, 11, 1, 10, 0, 0),
    'end': new Date(2017, 11, 1, 13, 0, 0)
  },
  {
    'title': 'Long Event',
    'start': new Date(2017, 11, 3, 5, 20, 14),
    'end': new Date(2017, 11, 4, 12, 10, 13)
  },
  {
    'title': 'Christmas Eve',
    'start': new Date(2017, 11, 24, 10, 10, 10),
    'end': new Date(2017, 11, 24, 18, 18, 18)
  },
  {
    'title': 'Christmas Day',
    'start': new Date(2017, 11, 25),
    'end': new Date(2017, 11, 26)
  }
]

let Basic = React.createClass({
  render(){
    //console.log(dateEvents)
    return (

      <div>
          
          <BigCalendar
            selectable
            
            events={dateEvents}
            defaultView='week'
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(2017, 11, 11)}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={(slotInfo) => alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}` +
              `\naction: ${slotInfo.action}`
            )}
            showMultiDayTimes
            startAccessor={ ({event}) => {
              console.log({event})
            }}
            endAccessor = { evt => {
              console.log(evt)
            }}
        />

      </div>
    )
  }
})

export default Basic;
