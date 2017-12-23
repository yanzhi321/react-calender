import React,{ Component } from 'react'

import G6 from '@antv/g6'
import G6Plugins from '@antv/g6-plugins'


const data = {
	"nodes": [
		{
			"shape": "customNode",
			"id": "d62d1569"
		}
	],
	"edges": []
}

class Child extends Component{

	constructor(props){

		super(props)
		this.state = {
			msg: 'Child'
		}

	}

	componentDidMount(){

		G6.registerNode('customNode', {
			draw(cfg, group){
				const text = group.addShape('text', {
					attrs: {
						x: 100, 
						y: 100, 
						fill: '#333',
						text: '我是一个自定义节点, \n 由下面那个方形和我自己组成'
					}
				});

				const rect = group.addShape('rect', {
					attrs: {
						x: 100,
						y: 100,
						width: 100,
						height: 100, 
						stroke: 'red'
					}
				});

				return text;
			}
		});

		const net = new G6.Net({
			id: 'c1', //container Id
			width: 500, //container 画布宽
			height: 500, //container 画布高
			grid: {
				forceAlign: true, //是否支持网格对齐
				cell: 10  //网格大小
			}
		});

		net.source(data.nodes, data.edges)
		net.render()

	}

	render(){

		const { msg } = this.state
		return(

			<div>
				<h2>this is {msg}</h2>
				<div id="c1"></div>
			</div>

		)

	}

}


export default Child