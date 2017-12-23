import React, { Component } from 'react'
import { Link } from 'react-router';
import G6 from '@antv/g6'
import G6Plugins from '@antv/g6-plugins'

//require('./static/css/nextG6.css')
import './static/css/nextG6.css'

//https://antv.alipay.com/zh-cn/g6/1.x/tutorial/index.html
const data = {
	"nodes": [],
	"deges": []
}

const anchorsPoints = [
	[0.5, 0],
	[0.25, 0],
	[0.75, 0],
	[1, 0.5],
	[0.5, 1],
	[0, 0.5],
]
		
 //set G6 canvas
let net = null;
const Util = G6.Util;

class NextG6 extends Component{

	constructor(props){

		super(props)
		this.state = {
			msg: 'NextG6',
			anchors: anchorsPoints,
			datas: {},
			labelRect: 'Rect',
			id:0,
			datasP: null,
			isClick: false
		}

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
	    const mouseEnterNodeStyle = {
	        lineWidth: 2
	    };
	    const nodeStyle = {
	        lineWidth: 1
	    };

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
	    net.source(data.nodes, data.edges);
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
	    	let shape = ev.shape;
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
	    	let shape = ev.shape;
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
	    	const tip = this.refs.tip;
	    	tip.style.display = 'block'
	    })

	}

	//addRect
	_addRect = () => {
		const { labelRect, id } = this.state
		net.beginAdd('node', {
    		shape: 'rect',
    		label: labelRect,
    		id: this.state.id++
    	})
	}

	//addCircle
	_addCircle = () => {

		const { anchors, labelRect } = this.state;
		console.log(net.beginAdd)
		net.beginAdd('node', {
			shape: 'circle',
			label: 'Circle',
			size: 100,
		})
	}

	//addEllipse
	_addEllipse = () => {
		const { labelRect } = this.state
		net.beginAdd('node', {
			shape: 'circle',
			label: 'Ellipse'
		})
	}

	//addRhombus
	_addRhombus = () => {
		const { labelRect } = this.state
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
		const { datas, datasP, isClick } = this.state;
		const saveData = net.save()
		const json = JSON.stringify(saveData, null, 2)
		console.log(json)

		const showData = this.refs.showData;
		showData.innerText = json

		this.setState({
			datas: json,
			datasP: saveData,
			isClick: true
		})
		//console.log(datas)
	}

	//addLine
	_anchorChange = () => {
		net.beginAdd('edge', {
			shape: 'line'
		})
	}

	//showMount
	_showMount = () => {

		const { datas, datasP, isClick } = this.state
		let netN = null;
		//load data
		if(isClick){
			 netN = new G6.Net({
				id: 'showMount',
				width:600,
				height: 600,
				fitView: 'cc'
			})
			netN.source(datasP.source.nodes, datasP.source.edges);
			//netN.render
			netN.render()
			console.log('netN', netN)
		}else{
			alert("please save the data")
		}
	}


	render(){

		const { msg }  = this.state
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
			    		<li><button className="save" onClick={this._anchorChange}>addLine</button></li>

					</ul>
					
				</div>
				<div className="showData" ref="showData">

				</div>
				<div className="tip" ref="tip">
					
				</div>
				<button onClick={this._showMount}>showMount</button>
				<div id="showMount" ref="showMount"></div>

			</div>

		)
	
	}

}

export default NextG6