import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//引入react-router
import { Router, Route, Link,browserHistory,IndexRoute } from 'react-router';

//good article---http://www.cnblogs.com/virtual/p/3735249.html#2944684
//引入组件
//http://116.62.169.175:8888/#tables/6f9f5f32-aa4d-4f07-bc19-b926ac781c7b -rethinkdb
//https://rethinkdb.com/api/javascript/#insert -rethinkdb
//https://winscp.net/eng/docs/after_installation?ver=5.11.3&lang=chs&utm_source=winscp&utm_medium=setup&utm_campaign=5.11.3&prevver=&automatic=0  -winscp

//https://coding.net/u/rais/p/hotmap/git/tree/feature/moniapxiaoxi/  coding.net

import Basic from './components/Basic'
import Cultures from './components/Cultures'
import Custom from './components/CustomHeader'
import CusView from './components/CustomView'
import Dnd from './components/Dnd'
import Popup from './components/Popup'
import Rendering from './components/Rendering'
import Select from './components/Selectable'
import Time from './components/Timeslots'
import Next from './components/Next'
import NextG6 from './components/NextG6'
import Child from './components/Child'

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
			  <Route path="next" component={Next}></Route>
			  <Route path="nextg6" component={NextG6}></Route>
			  <Route path="child" component={Child}></Route>

	    </Route>
  	</Router>),
	document.getElementById('root')

);

registerServiceWorker();
