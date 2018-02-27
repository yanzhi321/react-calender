import React, { Component } from 'react'
import G6 from '@antv/g6'
//import G6Plugins from '@antv/g6-plugins'

//require('./static/css/nextG6.css')
import './static/css/nextG6.css'

//https://antv.alipay.com/zh-cn/g6/1.x/tutorial/index.html
let net = null;
const Util = G6.Util;

let netN = null;

class NextG6 extends Component{

	constructor(props){

		super(props)
		this.state = {
			msg: 'NextG6',
			anchors: this.anchorsPoints,
			datas: {},
			labelRect: 'Rect',
			id:0,
			datasP: null,
			isClick: false, 
			dis: 'none',
			disN: 'none', 
			currentValue: 0
			
		}

		this.data = {
			"nodes": [],
			"deges": []
		}

		this.anchorsPoints = [
			[0.5, 0],
			[0.25, 0],
			[0.75, 0],
			[1, 0.5],
			[0.5, 1],
			[0, 0.5],
		]
		 //set G6 canvas
		this.divArr = []
		this.netArr = []
		
	}

	componentDidMount(){
		const { anchors } = this.state
		//group 使我们有画图的能力，cfg 则是绘制一个子项的配置信息。其三个视觉通道位置、大小、颜色和一个原始数据字段origin。
		//一个子项的形态就由这个四个信息决定！
		//G6.registerNode('rect',{})
		G6.registerNode('addRect', {
	    	draw(cfg, group) {
	    		const shape = group.addShape('rect', {
	    			attrs: {
	    				x: cfg.x - 40,
	    				y: cfg.y - 40,
	    				width: 80,
	    				height: 80,
	    				fill: '#fff',
	    				stroke: 'purple',
	    				value: 'rect'
	    			}
	    		});
	    		return shape;
	    	}, // 获取锚点
	    	getAnchorPoints(){
	    		return anchors;
	    	}
	    }, 'rect')

		//G6.registerNode('circle',{})
		G6.registerNode('addCircle', {
			draw(cfg, group) {
				const shape = group.addShape('circle', {
					attrs: { //circle
	    				x: cfg.x,
					    y: cfg.y,
					    r: 30,
					    stroke: 'blue'
				    }
	    		});     
	    		return shape;
			}
		})	

		//G6.registerNode('ellipse', {})
		G6.registerNode('addEllipse', {
			draw(cfg, group) {
				const shape = group.addShape('ellipse', {
					attrs: { //ellipse
						x: cfg.x,
						y: cfg.y,
						rx: 40,
				        ry: 20,
				        fill: '#eee',
				        stroke: 'pink'
					}
				})
				return shape;
			}
		})

		//G6.gegisterNode('rhombus', {})
		G6.registerNode('addRhombus', {
	    	draw(cfg, group) {
	    		const shape = group.addShape('rhombus', {
	    			attrs: {
	    				x: cfg.x,
	    				y: cfg.y,
	    				width: 100,
	    				height: 100
	    			}
	    		})
	    		return shape;
	    	}
	    })
		

		//set G6 canvas
	   	net = new G6.Net({
	        id: 'mountNode', // 容器ID
	        mode: 'edit', // 编辑模式
	        fitView: 'cc', // 自适应视口为左上
	        width: 600,
	        height: 600,
	        grid: {
	        	forceAlign: true,
	        	cell: 30,
	        	line: {
	        		stroke: '#ccc'
	        	}
	        }
	    });

	   	//net.toolTip
	   	net.tooltip(true)

	   	//input
	   	const graphContainer = net.get('graphContainer');
	    const input = Util.createDOM('<input class="g6-label-input" />', {
	        position: 'absolute',
	        zIndex: 10,
	        display: 'none'
	    });
    	/*const mouseEnterNodeStyle = {
         *	lineWidth: 2
    	 *};
	     */
	    /*const nodeStyle = {
	     *  lineWidth: 1
	     *};
	     */

	    function hasClass(shape, className) {
	        if (shape) {
	            const clasees = shape.get('class');
	            if (clasees && clasees.indexOf(className) !== -1) {
	                return true;
	            }
	        }
	        return false;
	    }

	    function showInputLabel(node) {
	        if (!node) {
	            return;
	        }
	        const group = node.get('group');
	        const label = group.findBy(function(child) {
	            if (hasClass(child, 'label')) {
	                return true;
	            }
	            return false;
	        });
	        const rootGroup = net.get('rootGroup');
	        const bbox = Util.getBBox(label, rootGroup);
	        const borderWidth = 1;
	        const text = label.attr('text');
	        clearAllActived();

	        input.value = text;
	        input.show();
	        input.css({
	            top: bbox.minY - borderWidth + 'px',
	            left: bbox.minX - borderWidth + 'px',
	            width: bbox.width + 10 + 'px',
	            height: bbox.height + 5 +  'px',
	            padding: '0px',
	            margin: '0px',
	            border: borderWidth + 'px solid #999',
	            color: 'red',
	            fontSize: '16px'
	        });
	        input.focus();
	        input.node = node;
	    }

	    function updateLabel() {
	        if (input.visibility) {
	            const node = input.node;
	            clearAllActived();
	            if (input.value !== node.get('model').name) {
	                if (input.value) {
	                    net.update(node, {
	                        label: input.value
	                    });
	                }
	            }
	            input.hide();
	        }
	    }

	    function clearAllActived() {
	        net.clearAllActived();
	        net.refresh(false);
	    }
	    input.hide = function() {
	        input.css({
	            display: 'none'
	        });
	        input.visibility = false;
	    };
	    input.show = function() {
	        input.css({
	            display: 'block'
	        });
	        input.visibility = true;
	    };
	    graphContainer.appendChild(input);

	    //input.on
	    net.on('dragmove', () => {
	        input.hide();
	    });

	    net.on('dblclick', ev => {
	        const item = ev.item;
	        const shape = ev.shape;

	        if (hasClass(shape, 'label') && item && item.get('type') === 'node') {
	            showInputLabel(item);
	        }
	    });
	   

	    input.on('keydown', ev => {
	        if (ev.keyCode === 13) {
	            updateLabel();
	        }
	    });

	    input.on('blur', () => {
	        updateLabel();
	    });

	    //load data
	    net.source(this.data.nodes, this.data.edges);
	    net.removeBehaviour(['hoverNodeShowAnchor', 'dragEdgeEndHideAnchor', 'dragNodeEndHideAnchor']);
	    //net.edge--添加箭头
	    net.edge().style({
	    	arrow: true,
	    	stroke: 'red',
	    	text: 'line'
	    })

	    //net.render
	    net.render()

	    //  编辑交互变形
	    let dragging = false;
	    net.on('dragstart', function(ev){
	    	dragging = true;
	    });
	    net.on('dragend', function(ev){
	    	dragging = false;
	    })

	    //进入锚点切换到曲线添加模式
        //addLine: 直线-line/曲线-smooth/二次贝塞尔曲线 bezierQuadratic/水平-竖直 HV/竖直-水平-竖直 VHV/水平-竖直-水平 HVH
	    net.on('mouseenter', function(ev){
	    	//console.log(ev)
	    	let item = ev.item;
	    	/*if(shape && shape.hasClass('anchor-point') && !dragging){
	    		net.beginAdd('edge', {
	    			shape: 'line',
	    		})
	    	}*/
	    	if(item.get('type') === 'node'){
	    		net.showAnchor(item)
	    	}
	    })

	    // 离开锚点切换回编辑模式
	    net.on('mouseleave', function(ev){
	    	let item = ev.item
	    	/*if(shape && shape.hasClass('anchor-point') && !dragging){
	    		net.changeMode('edit')
	    	}*/
	    	if(item.get('type') === 'node'){
	    		net.hideAnchor(item)
	    	}
	    })

	    // 绘制后显示锚点
	    net.on('afteritemrender', function(ev){
	    	//console.log(ev)
	    	//let net = net
	    	let item = ev.item;
	    	if(item.get('type') === 'node'){
	    		//net.showAnchor(item)
	    	}
	    })
	    //net.tooltip
	   net.node().tooltip(obj => {
	    	return [
	    		['id', obj.id],
	    		['shape', obj.shape]
	    	]
	    })

	    //netonclick
	    
	    net.on('itemclick', ev => {

	    	if(ev.item.get('model').shape !== 'line'){

		    	this.setState({
		    		dis: 'block'
		    	}) 
		    	const tipBg = this.refs.tipBg
		    	tipBg.style.display = this.state.dis

		    	console.log('ev.item', ev.item)
		    	
		    	//ref
		    	const conId  = this.refs.conId;
		    	const conShape = this.refs.conShape;
		    	const conText = this.refs.conText;
		    	conId.innerText = 'ID:    ' + ev.item.get('model').id;
		    	conShape.innerText = 'shapeName   :' +  ev.item.get('model').shape;
		    	conText.innerText = 'label:    '  + ev.item.get('model').label;

	    	}
	    })
	}

	//componentWillUpdate 
	componentWillUpdate(nextProps, nextState){
		//console.log('nextProps', nextProps)
		//console.log('nextState', nextState)
	}

	//addRect
	_addRect = () => {
		const { labelRect} = this.state

		net.beginAdd('node', {
    		shape: 'rect',
    		label: labelRect,
    		id: this.state.id++
    	})
    	//console.log(net)
	}

	//addCircle
	_addCircle = () => {
		net.beginAdd('node', {
			shape: 'circle',
			label: 'Circle',
			size: 100,
		})
	}

	//addEllipse
	_addEllipse = () => {
		net.beginAdd('node', {
			shape: 'circle',
			label: 'Ellipse'
		})
	}

	//addRhombus
	_addRhombus = () => {
		net.beginAdd('node', {
			shape: 'rhombus',
			label: 'Rhombus'
		})
	}

	//drag
	_drag = () => {
		net.changeMode('drag')
	}

	//edit
	_edit = () => {
		net.changeMode('edit')
	}

	//save
	_save = () => {
		
		const saveData = net.save()
		const json = JSON.stringify(saveData, null, 2)
		//console.log(json)

		const showData = this.refs.showData;
		showData.innerText = json

		this.setState({
			datas: json,
			datasP: saveData,
			isClick: true
		})

		console.log(this.state.datasP)
	}

	//addLine
	_anchorChange = () => {
        //addLine: 直线-line/曲线-smooth/二次贝塞尔曲线 bezierQuadratic/水平-竖直 HV/竖直-水平-竖直 VHV/水平-竖直-水平 HVH
		net.beginAdd('edge', {
			shape: 'line'
		})
	}

	//addsmooth
	_addSmooth = () => {
		net.beginAdd('edge', {
			shape: 'smooth'
		})
	}

	//addHVH 
	_addHVH = () => {
		net.beginAdd('edge', {
			shape: 'HVH',
			fill: 'purple',
			stroke: '#ccc'
		})
	}

	//showMount
	_showMount = (e) => {
		
		const { datasP, isClick, disN } = this.state
		const showMount = this.refs.showMount
		
		const nextClick = false;
		const nextDatasP = null
		this.setState({
			datasP: nextDatasP,
			isClick: false,
		})
		
		if(isClick){
			netN = new G6.Net({
				id: 'showMount', // 容器ID
				mode: 'edit', // 编辑模式
				fitView: 'cc', // 自适应视口为左上
				width: 600,
				height: 600,
				grid: {
					forceAlign: true,
					cell: 30,
					line: {
						stroke: '#ccc'
					}
				}
			})
			netN.source(datasP.source.nodes, datasP.source.edges)
			console.log(netN)
			netN.render()

			this.state.datasP  = {}
			this.setState({
				datasP: this.state.datasP,
				disN: 'block'
			})

		}else{
			alert("please save the data")
		}

		console.log('isClick', this.state.isClick)
		
	}

	//hide--tipBg
	_hideBg = () => {
		const { dis } = this.state
		const tipBg = this.refs.tipBg
		this.setState({
			dis: !dis
		})
		tipBg.style.display = this.state.dis
	}


  getCurrentValue = (currentValue) => {
  	this.setState({
  		currentValue: currentValue
  	})
  }
	

	//render
	render(){

		const { dis, disN }  = this.state
		return(

			<div>
				<div id ="mountNode">
					<ul className="toolbar">
						<li><button className="addRect" onClick={this._addRect}>addRect</button></li>
						<li><button className="addCircle" onClick={this._addCircle}>addCircle</button></li>
			    		<li><button className="addEllipse" onClick={this._addEllipse}>addEllipse</button></li>
			    		<li><button className="addRhombus" onClick={this._addRhombus}>addRhombus</button></li>
			    		<li><button className="drag" onClick={this._drag}>拖拽模式</button></li>
			    		<li><button className="edit" onClick={this._edit}>编辑模式</button></li>
			    		<li><button className="save" onClick={this._save}>保存</button></li>
			    		<li><button className="addLine" onClick={this._anchorChange}>addLine</button></li>
			    		<li><button className="addSmooth" onClick={this._addSmooth}>addSmooth</button></li>
			    		<li><button className="addHVH" onClick={this._addHVH}>addHVH</button></li>
					</ul>
					<ul className='left-bar'>
						<li>first</li>
						<li>second</li>
						<li>third</li>
						<li>forth</li>
						<li>firth</li>
					</ul>
				</div>
				<div className="showData" ref="showData">

				</div>
				<div className="tip-bg" ref="tipBg" onClick={this._hideBg} style={{display: dis }}>
					<div className="tip" ref="tip" onClick={ e => { e.stopPropagation() } } > 
						<ul className="tip-con">
							<li><span className="con-id" ref="conId"></span></li>
							<li><span className="con-shape" ref="conShape"></span></li>
							<li><span className="con-text" ref="conText"></span></li>
						</ul>
					</div>
				</div>

				<div className="mountAction" style={{width: 600, height: 600, margin: 30}}>
					<button onClick={this._showMount}>showMount</button>
					<div id="showMount" ref="showMount" style={{display: disN}}>

					</div>
				</div>
				
				


			</div>

		)
	
	}

}

export default NextG6