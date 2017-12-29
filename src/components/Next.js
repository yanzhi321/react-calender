import React, { Component } from 'react'

import ReactGantt from 'gantt-for-react'
import jsPlumb from 'jsplumb'

import G6 from '@antv/g6'
import G6Plugins from '@antv/g6-plugins'


// 第三步：设置数据
  const data = {
    "nodes": [
      {
        "x": 140,
        "y": 210,
        "id": "node1"
      },
      {
        "x": 270,
        "y": 210,
        "id": "node2"
      }
    ],
    "edges": [
      {
        "source": "node1",
        "id": "edge1",
        "target": "node2"
      }
    ]
  };

const dataC2 = {
  "nodes": [
    {
      "shape": "rect",
      "label": "流程b1",
      "id": "e4d76a7f"
    },
    {
      "shape": "rect",
      "label": "流程a1",
      "id": "f1484ff9"
    },
    {
      "shape": "rect",
      "label": "开始",
      "id": "827c30fc"
    },
    {
      "shape": "rect",
      "label": "结束",
      "id": "6ca66cc0"
    },
    {
      "shape": "rect",
      "label": "流程a3",
      "id": "c06c2256"
    },
    {
      "shape": "rect",
      "label": "流程b2",
      "id": "1de16a07"
    },
    {
      "shape": "rect",
      "label": "流程a2",
      "id": "3b63e239"
    }
  ],
  "edges": [
    {
      "source": "827c30fc",
      "target": "e4d76a7f",
      "id": "52eaf313"
    },
    {
      "source": "827c30fc",
      "target": "f1484ff9",
      "id": "66daf43b"
    },
    {
      "source": "e4d76a7f",
      "target": "1de16a07",
      "id": "e5c4e030"
    },
    {
      "source": "f1484ff9",
      "target": "3b63e239",
      "id": "7ccbcdac"
    },
    {
      "source": "1de16a07",
      "target": "6ca66cc0",
      "id": "5fca64c8"
    },
    {
      "source": "3b63e239",
      "target": "1de16a07",
      "id": "0afb7710"
    },
    {
      "source": "f1484ff9",
      "target": "c06c2256",
      "id": "c511e9b6"
    },
    {
      "source": "c06c2256",
      "target": "6ca66cc0",
      "id": "e558b462"
    }
  ]
};  
let net = null;

class Next extends Component{

	constructor(props){
		super(props)
		this.state = {
			msg: 'Next',
      addMount: false
		}
	}

  //componentDidMount
	componentDidMount(){


     
	}

	_handleClick = () => {
		
    const { addMount } = this.state;
	  // 第四步：配置G6画布
    net = new G6.Net({
      id: 'c1',      // 容器ID
      width: 500,    // 画布宽
      height: 500    // 画布高
    });
    // 第五步：载入数据
    net.source(data.nodes, data.edges);
    // 第六步：渲染关系图
    net.render();
    console.log(net.length)
	}

	_showC2 = () => {

		//G6Plugins
		const dagre = new G6Plugins['layout.dagre']({
		  rankdir: 'LR',
		  nodesep: 100,
		  ranksep: 100,
		});

		//四 配置G6画布
	 const netC2 = new G6.Net({
		  id: 'c2',
		  height: window.innerHeight,
		  fitView: 'autoZoom',
		  plugins: [dagre]
		});

		//五：载入数据
		netC2.source(dataC2.nodes, dataC2.edges);

		//六：渲染关系图
		netC2.edge().shape('arrow');
		netC2.render();

	}


	render(){

		const { msg } = this.state
		return(

			<div>
				<h2>this is { msg }</h2>
				<button onClick={this._handleClick}>@antv/g6</button>
				<div id="c1" style={{width: '500px', height: '500px', border: '1px solid #ccc', background: '#ccc', margin: '50px'}}>
					<p>are you ok </p>
				</div>
				
				<button onClick={this._showC2}>netC2</button>
				<div id='c2'>
					
				</div>

			</div>

		)

	}

}


export default Next