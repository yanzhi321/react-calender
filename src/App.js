import React, { Component } from 'react';
import { render } from 'react-dom';

import 'react-big-calendar/lib/less/styles.less';

import localizer from 'react-big-calendar/lib/localizers/globalize';
import globalize from 'globalize';

import './components/static/css/styles.less';
import './components/static/css/prism.less';
//引入react-router link模块
import {Link} from 'react-router';
import './components/static/css/basic.css';

//import globalize from 'globalize'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { Modal, Button } from 'antd';
import 'normalize.css'


localizer(globalize);


//localizer(globalize);


class App extends Component {

    constructor(props){
        super(props)
    }


    render() {
    return (
      <div className="App">
        	<div className="header">
    			<ul>
    				<li><a href="#"></a></li>
    				<li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>basic</Link></li>
    				<li><Link to="/cultures" activeClassName="active" >Cultures</Link></li>
    				<li><Link to="/custom" activeClassName="active" >CustomHeader</Link></li>
    				<li><Link to="/cusView" activeClassName="active" >CustomView</Link></li>
    				<li><Link to="/dnd" activeClassName="active" >Dnd</Link></li>
                    <li><Link to="/pop" activeClassName="active">Popup</Link></li>
    				<li><Link to="/render" activeClassName="active">Rendering</Link></li>
                    <li><Link to="/select" activeClassName="active">Selectable</Link></li>
                    <li><Link to="/time" activeClassName="active">Timeslots</Link></li>

    			</ul>
        	</div>
        	<div className="child">
        		{this.props.children}
        	</div>
        	
      </div>
    );
    }
}

export default App;
