import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from './static/events';
import 'whatwg-fetch'

let sendArr = [
    {
      mac: '123adf',
      ip: '0.0.0.0',
      channel: 153,
      radioType: 1,
      connected: 0,
      rssi: -90,
      noiseFloor: -105
    }
  ]
let Popup = React.createClass({

  componentDidMount(){
    
    let url = 'http://192.168.30.211'
      fetch(url).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })

  },

  render(){
    return (
      <div>
        <h3 className='callout'>
          popup
        </h3>
        <BigCalendar
          popup
          events={events}
          defaultDate={new Date(2015, 3, 1)}
        />
      </div>
    )
  }
})

export default Popup;
