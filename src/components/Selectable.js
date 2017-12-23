import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import events from './static/events';
import './static/css/select.css'

import { Modal, Button, Icon, DatePicker, Input } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
const DragAndDropCalendar = withDragAndDrop(BigCalendar);


let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
console.log(allViews)

let defaultViews = ['month',  'week', 'work_week', 'day', 'agenda']

//antd design
const { MonthPicker, RangePicker } = DatePicker;
let  dateFormat = 'YYYY/MM/DD';
let  monthFormat = 'YYYY/MM';


function formatDate(fmt){

   //fmt = new Date()
   let year = fmt.getFullYear()
   let month = fmt.getMonth() < '10' ? '0' + (fmt.getMonth() + 1) : fmt.getMonth() + 1
   let day = fmt.getDay() <  '10' ? '0' + fmt.getDay()  : fmt.getDay()

   return fmt = year + '/' + month + '/' + day

}

function apm(ele){

  let hour = ele.getHours() 
  let hours = ele.getHours() >= '12' ?  'PM ' + ele.getHours()  : 'AM ' + ele.getHours()
  let minute = ele.getMinutes() < '10' ? '0' + ele.getMinutes() : ele.getMinutes()

  let senconds = ele.getSeconds() < '10' ? '0' + ele.getSeconds() : ele.getSeconds()

  return parseInt(hour + ':' + minute) >= '12' ? (hour + ':' + minute) + ' PM' : (hour + ':' + minute) + ' AM '
}


//e.clientX, e.clientY
let num1, num2, num3 = 0;
document.onclick = function(evt){
  let e = evt || window.event;
  //let leftMax = document.querySelector('.rbc-calendar').clientWidth
  //let topMax = document.querySelector('.rbc-calendar').clientHeight
  let leftMax = document.body.clientWidth -350
  let topMax = document.body.clientHeight -550
  //console.log(leftMax, topMax)
  num1 = e.clientX;
  num2 = e.clientY;
  if(num1 >= leftMax){
    num1 = e.clientX - 300;
    num2 = e.clientY - 50
  }else if(num1 <= 450) {
    num1 = e.clientX + 50
    num2 = e.clientY + 300

  }
  if(num2 >= topMax){
    num2 = e.clientY - 350
    //console.log('num2', num2)
  }else if(num2 <= 350){
    num2 = e.clientY - 10
    console.log('num2', num2)
  }
}

//onmousewheel 
function disabledMouseWheel(){
  if(document.addEventListener){
    document.addEventListener('DOMMouseScroll', scrollFunc, false)
  }
  window.onmousewheel = document.onmousewheel = scrollFunc //IE/opera/google
}

//scrollFunc
function scrollFunc(evt){
  let e = evt || window.event
  if(e.preventDefault){
    //Fireworks
    e.preventDefault()
    e.stopPropagation()
  }else{
    //Ie
    e.cancelBubbel = true;
  }
  return false;
}


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
    'end': new Date(2017, 11, 24, 11, 11, 18)
  },
  {
    'title': 'Christmas Day',
    'start': new Date(2017, 11, 25),
    'end': new Date(2017, 11, 26),
    desc: 'Do you know I had have one apple last tonight'
  },
  {
    'title': 'this is first',
    'start': new Date(2017, 11, 25, 10, 0, 0),
    'end': new Date(2017, 11, 25, 11, 0, 0)
  },
  {
    'title': 'this is second',
    'start': new Date(2017, 11, 25, 12, 0, 0),
    'end': new Date(2017, 11, 25, 13, 0, 0)
  },
  {
    'title': 'this is third',
    'start': new Date(2017, 11, 25, 14, 0, 0),
    'end': new Date(2017, 11, 25, 15, 0, 0)
  },
  {
    'title': 'Happy New Year',
    'start': new Date(2017, 11, 30, 12, 10, 10),
    'end': new Date(2017, 11, 30, 15, 0, 0,),
    desc: 'today is the last day in 2017'
  }
]

let newDateEvents = null;

class Selectable extends Component{

  constructor(props){
      super(props)
      this.state = {
        visible: false,
        dis: false,
        eventsDate: dateEvents,
        value: '',
        opacity: 0,
        timeStart: '',
        timeEnd: '',
        disabled:'disabled',
        delDateEvent:newDateEvents,
        isClick: false,
        posX:num1,
        posY:num2,
        defaultViews: defaultViews,
        display: false
      }
  }


  //componentDidMount
  componentDidMount(){

      //console.log('dom has done')
      //https://dhtmlx.com/docs/products/dhtmlxGantt/#product-features
      //https://github.com/DHTMLX/react-gantt-demo   甘特图
      //react--cli  https://github.com/bodyno/universal-react-starter-kit
      //jsplumb  https://jsplumbtoolkit.com/docs/toolkit/demo-react.html#babel-setup

  }

  //componentWillUpdate
  componentWillUpdate(nextProps, nextState){
    //console.log('nextState', nextState)
  }

  //showBg
  showBg = () => {

    const { dis, display, disabled } = this.state
    window.onmousewheel = document.onmousewheel = function(){
        return true
    }

    this.setState({
        dis: !dis,
        display: !display,
        disabled: true
    })

    //console.log(this.state.display)

  }

  showModal = () => {

      this.setState({
        visible: true,
      });

  }

  handleOk = (e) => {
      //console.log(e);
      this.setState({
        visible: false,
      });
  }
  handleCancel = (e) => {

    //console.log(e);
    this.setState({
      visible: false,
    });

  }

  //inputChange
  _inputChange = (e) => {

      console.log(e.target.value)
      this.setState({
        value: e.target.value
      })

  }

  //titie-clear
  _titClear = (e) => {

      const {value} = this.state
      this.setState({
        value: value
      })
      let titVal = this.refs.myTitle;
      titVal.value = ''
  }


  //res-cancel
  _resCancel = () => {
    this.setState({
        dis: !this.state.dis
    })
  }

  //res-save
  _resSave = (e) => {

      const { eventsDate, isClick } = this.state
      console.log(eventsDate)
      let result = {}
      let tit1 = "zhangsan"
      let dateS = new Date(2017, 12, 12)
      let dateE = new Date(2017, 12, 13)
      result.title = tit1
      result.start = dateS
      result.end = dateE

      //eventsDate.push(result)
      let addEvents = {}
      let addTit = this.refs.conTitle.innerText 
      let addStart = this.refs.hideS.innerText 
      let addEnd = this.refs.hideE.innerText

      let myTitle = this.refs.myTitle
      //console.log(new Date(addStart))

      if(isClick){

        addEvents.title = addTit
        addEvents.start = new Date(addStart)
        addEvents.end = new Date(addEnd)
        eventsDate.push(addEvents)

        //myTitle clear
        myTitle.value = ''
        this.refs.conTitle.innerText = '(无标题)'

      }else{
        alert("check the prev button")
        myTitle.focus()
        return false;
      }
      
      this.setState({
          dis: !this.state.dis,
          eventsDate: eventsDate,
          isClick: !isClick
      })

  }


  //conTitle
  _titleSave = (e) => {

      const { value, isClick } = this.state;

      let conTitle = this.refs.conTitle
      let myTitle = this.refs.myTitle

      if(!myTitle.value){
        alert("please input")
        return false;
      }else{
        alert("success")
      }

      let newIsClick = true
      this.setState({
        value: value,
        isClick: newIsClick
      })
      
      conTitle.innerText = value

      console.log(isClick)

  }


  //change-date
  _eventsDel = () => {

      const { eventsDate, dis, delDateEvent } = this.state;

      const nextEvents = [...eventsDate]
      nextEvents.splice(delDateEvent, 1)

      console.log(delDateEvent)
      this.setState({
        dis:!dis,
        eventsDate: nextEvents
      })

  }

  //_eventsEdit
  _eventsEdit = () => {

    const { disabled, dis } = this.state;

    let enabled = !this.state.disabled

    console.log('enabled', enabled)

    console.log('dis', dis)
    this.setState({
      disabled:false
    })

  }

  //moveEvent
  moveEvent = ({event, start, end}) => {

    console.log(start)
    const { eventsDate } = this.state;

    //indexOf(event)查找到event的下标
    const idx = eventsDate.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...eventsDate]
    //移除数组的第idx元素，并在数组第idx位置添加新元素updatedEvent
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      eventsDate: nextEvents
    })
    //alert(`${event.title} was dropped onto ${event.start}`);



  }

/*
 selector.on('select', function () {
    if (_this2.state.selecting) {
      _this2._selectSlot(_extends({}, _this2.state, { action: 'select' }));
      _this2.setState({ selecting: false });
    }
  });
*/
  render(){
    const {eventsDate, dis, disabled, defaultViews} = this.state
   
    return ( 
      <div>
        <div className="bg-modal" ref="mybg" onClick={this.showBg} style={{display: this.state.dis}}>
            <div className="downCon" ref = "downCon" onClick={ e => { e.stopPropagation() }}>
              <p ref="conTitle">(无标题)</p>
              <div className="conDate">
                <span ref="dateStart"></span>
                <span>—</span>
                <span ref="dateEnd"></span>
              </div>
            </div>

            <div className="inner-modal" ref="innerModal" style={{visible: this.state.visible}} onClick={ (e) => {e.stopPropagation()}}>
                  <div className = "hiddenBox" style={{display: 'none'}} >
                      <span ref = "hideS"></span>
                      <span ref = "hideE"></span>
                  </div>
                 <ul className="modal-con">
                    <li className="con-title">
                        <input type = "text" placeholder="添加标题" autoFocus={true} className="title" onChange={this._inputChange} ref="myTitle" />
                        <div className="title-btn">
                            
                            <Button className="btn-cancel" style={{margin:'0 20px 0 5px'}} onClick={this._titClear}>取消</Button>
                            <Button type="primary" className="btn-confirm"  onClick={this._titleSave}>确定</Button>
                            
                        </div>
                    </li>
                    <li className="con-time">
                        <div className="time-change">
                            <div className="icon">
                              <i className="clock-icon">※</i>
                            </div>
                            <div className="time-check">
                              <input className="time-start" defaultValue="2017/11/11" ref = "timeS" />-
                                <input className="time-end" defaultValue="2017/11/30" ref = "timeE" />
                            </div>
                        </div>
                    </li>
                    <li className="foot-btn">
                      <div className="foot-btn-check">
                          
                          <Button className="btn-f-cancel" onClick={this._resCancel}>取消</Button>
                          <Button type="primary" className="btn-f-confirm" onClick={this._resSave} >保存</Button>
                          
                      </div>
                    </li>
                 </ul>
                   
            </div>
        </div>

        <div className="change-modal" ref="myModal" onClick={this.showBg} style={{display: this.state.dis}}> 
          <div className="change-date" ref="myChange" onClick={ e => { e.stopPropagation() } }>
               
             <div className="top">
                
                <div className="icon-action">

                    <Icon type="edit" className="edit icon" title="edit"  onClick={this._eventsEdit} />
                    <Icon type="delete" className="del icon" title="delete" onClick={this._eventsDel}  />
                    <Icon type="close-circle-o" className="close icon" title="close"  onClick={this.showBg} />
                </div>
                <div className="task">
                    <input placeholder="添加标题" defaultValue="" className="title-task" disabled={disabled} ref="myTask" />
                </div>
             </div>

             <div className="bot">
                <div className="bot-date">
                    <Icon type="clock-circle-o icon" title="clock-time" />
                    <div className="date-receive"> 
                        <input className="time-start" placeholder="start date"   disabled={disabled}  ref = "reTimeS" />-
                        <input className="time-end" placeholder="end date"  disabled={disabled} ref = "reTimeE" />
                    </div>
                </div>
                <div className="bot-when">
                    <Icon type="bell icon" title="bell-time" />
                    <span className="bell-time">before what time is it</span>
                </div>
             </div>

          </div>
        </div>

        <DragAndDropCalendar
          
          selectable={true}
          events={eventsDate}
          views= {defaultViews}
          scrollToTime={new Date(1970, 1,  6)}
          defaultDate={new Date()}
          onEventDrop = {this.moveEvent}
          onSelectEvent={event => {
              
              
              if(true){
                alert(event.title)
              }else{
                return event.title
              }
              
              const { eventsDate,  dis, display } = this.state;
              
              //idx
              const idx = eventsDate.indexOf(event);
              //console.log(idx)
              //console.log(selecting)

              this.setState({
                eventsDate: eventsDate,
                delDateEvent: idx,
                display: true
              })

              console.log(display)
              if(!display){
                disabledMouseWheel()
              }

              //change-date
              let myModal = this.refs.myModal
              myModal.style.display = 'block'

              //myChange
              let myChange = this.refs.myChange
              myChange.style.left = num1 +  'px'
              myChange.style.top = num2 + 'px'

              //leftMax、topMax
              let leftMax = document.body.clientWidth
              let topMax = document.body.clientHeight

              console.log(leftMax, topMax)

              //onmousewheel  disabledMouseWheel()

              let myTask = this.refs.myTask;
              let reTimeS = this.refs.reTimeS
              let reTimeE = this.refs.reTimeE
              myTask.value = `${event.title}`
              reTimeS.value = `${event.start.toLocaleString()}`
              reTimeE.value = `${event.end.toLocaleString()}`
             
            }
          }
          selecting={true}

          components={{
            event: Event,
            agenda: {
              event: EventAgenda
            }
          }}

          onSelectSlot={(slotInfo) => {
              
              //甘特图

              const { defaultViews, display } = this.state;

              alert(`${slotInfo.start.toLocaleString('chinese', {hour12: false})}  am`)

              //rbc-slot-selection
              let slot = document.querySelector('.rbc-slot-selection')
              
              let bg = this.refs.mybg
              bg.style.display = 'block';
              bg.onmousewheel = function(){
                return false
              }

              //timeS
              let timeS = this.refs.timeS;
              let timeE = this.refs.timeE;
              
              //console.log(slotInfo.start.getHours())

              timeS.value = slotInfo.start.getHours() < 12 ? `${slotInfo.start.toLocaleString('chinese', {hour12: false})} AM` : `${slotInfo.start.toLocaleString('chinese', {hour12: false})} PM`
              timeE.value = slotInfo.end.getHours() < 12 ? `${slotInfo.end.toLocaleString('chinese', {hour12: false})} AM` : `${slotInfo.end.toLocaleString('chinese', {hour12: false})} PM`
              
              //onmousewheel
              
              this.setState({
                  timeSatrt:timeS.value,
                  timeEnd: timeE.value,
              })
            
              // inner-modal
              let innerModal = this.refs.innerModal;
              
              
              //conTitle
              let conTitle = this.refs.conTitle
              let conStart = this.refs.dateStart
              let conEnd = this.refs.dateEnd
              //conStart.innerText = slotInfo.start.toLocaleString()
              //conEnd.innerText = slotInfo.end.toLocaleString()

              
              conStart.innerText = apm(slotInfo.start)
              conEnd.innerText = apm(slotInfo.end)

              //_resSave()
              let addTit = this.refs.conTitle
              let addStart = this.refs.hideS
              let addEnd = this.refs.hideE
              addStart.innerText = slotInfo.start
              addEnd.innerText = slotInfo.end
                
            }
          }

        />

      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Selectable);

