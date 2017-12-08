import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//引入react-router
import { Router, Route, Link,browserHistory,IndexRoute } from 'react-router';

//引入组件


import Basic from './components/Basic'
import Cultures from './components/Cultures'
import Custom from './components/CustomHeader'
import CusView from './components/CustomView'
import Dnd from './components/Dnd'
import Popup from './components/Popup'
import Rendering from './components/Rendering'
import Select from './components/Selectable'
import Time from './components/Timeslots'

//配置路由  history={browserHistory} 可以让路由变得又优美一些
//IndexRoute默认加载的是主页
//这是配置路由
ReactDOM.render((
	<Router history={browserHistory}>
	    <Route path="/" component={App}>
			 <IndexRoute component={Basic} />
			  
			  <Route path="cultures" component={Cultures}></Route>
			  <Route path="custom" component={Custom}></Route>
				<Route path="cusView" component={CusView}></Route>
			  <Route path="dnd" component={Dnd}></Route>
			  <Route path="pop" component={Popup}></Route>
			  <Route path="render" component={Rendering}></Route>
			  <Route path="select" component={Select}></Route>	
			  <Route path="time" component={Time}></Route>	

	    </Route>
  	</Router>),
	document.getElementById('root')

);

registerServiceWorker();
