import React,{ Component } from 'react'

import './static/css/child.css'

//require.context
const requireContext = require.context("../assets/images", true, /^\.\/.*\.png$/);
const images = requireContext.keys().map(requireContext);

const requireEmoji = require.context("../assets/emoji", true, /^\.\/.*\.gif$/);
const emojis = requireEmoji.keys().map(requireEmoji)


class Emoji extends Component{
	constructor(props){
		super(props);
		this.state={
			msg: 'Emoji',
			imgStyle: {
				width: 30,
				height: 30
			},
			dis: false,
			val: '',
			count: 0,
			eCount: 0,
			listArr: [11111,22222,33333,44444],
			emojisArr: emojis,
			disN: 'none',
			
		}

		this.divArr = []

	}

	_showEm = () => {
		const { dis }  = this.state
		this.setState({
			dis: !dis
		})
	}

	_listClick = (index) => {
		const { emojisArr, eCount } = this.state
		//console.log(emojis)
		//console.log(emojisArr[index])
		//emojisArr.splice(index, 1)

		let showMsg = this.refs.showMsg
		let liNode = document.createElement('li')
		let imgNode = document.createElement('img')

		imgNode.setAttribute('src', emojisArr[index])
		liNode.appendChild(imgNode)
		showMsg.appendChild(liNode)

		const eCountN  = ++this.state.eCount
		eCountN % 2 ? liNode.style.textAlign = 'left' : liNode.style.textAlign  = 'right'
		this.setState({
			emojisArr: this.state.emojisArr,
			eCount: eCountN
		})
		console.log(eCount)

		//const showmsg = document.getElementsByClassName('show-msg')
		//console.log(showmsg)

		/* cloneNode
			let imgE = this.refs.imgE
			let showMsg = this.refs.showMsg
			let cloneImg = imgE.cloneNode(true)

			showMsg.appendChild(cloneImg)
		*/
	}

	//send-input
	_onChange = (e) => {
		const { val,count } = this.state
		this.setState({
			val: e.target.value
		})
	}

	//send-btn
	_sendMsg = (e) => {

		const { val,count } = this.state
		const showMsg = this.refs.showMsg
		const myInput = this.refs.myInput

		let li = document.createElement('li')
		let txt = document.createTextNode(val)

		if(myInput == ''){
			alert('please input')
			return false;
		}

		li.appendChild(txt)
		showMsg.appendChild(li)	

		const countN = ++this.state.count
		countN % 2 ? li.style.textAlign = 'left' : li.style.textAlign = 'right' 
		console.log(countN)

		this.setState({
			count: countN
		})

	}

	//listArr
	_listArr = (index) =>{
		const { listArr } = this.state
		console.log(index)
		console.log(listArr[index])

		listArr.splice(index, 1)
		this.setState({
			listArr: this.state.listArr
		})

	}

	//addDom
	_addDom = () => {
		
		const addDiv = this.refs.addDiv;
		console.log(addDiv)

		const oDiv = document.createElement('div')
		const txt = document.createTextNode('this is addDom')

		oDiv.appendChild(txt)
		this.divArr.push(oDiv)
		if(this.divArr.length >= 2){
			return false;
		}
		addDiv.appendChild(oDiv)
		
		console.log('divArr', this.divArr)

	}

	render(){

		const { imgStyle, dis, listArr, emojisArr, disN } = this.state
		let change = dis ? 'hidden' : 'visible'
		let that = this
		return(
			<div id="container">
				<h2>{this.state.msg}</h2>
				<ul className="list-emoji" style={{visibility: change}}>
					{
						emojisArr.map( (con, i) => {
							return(
								<li key={i} onClick={this._listClick.bind(this, i)} ref="liNode">
									<img src={con} style={imgStyle} ref="imgE" />
 								</li>
 							)
						})
					}
				</ul>
				
				<ul className="list">
					{
						listArr.map( (con, i) => {
							return(
								<li key={i} ref="liOne" onClick={that._listArr.bind(that, i)} >
									{con}
								</li>
							)
						}) 
					}
				</ul>

				<div className="send-box">
					<button onClick={this._showEm}>showEmo</button>
					<input type="text" placeholder="enter message" ref="myInput" className="send-input" onChange={this._onChange} autoFocus={true} />
					<button className="send-btn" onClick={this._sendMsg}>send</button>
					<ul className="show-msg" ref="showMsg" style={{width: 300, height: 300, border: '1px solid #ccc'}}>

					</ul>
				</div>
				
				<hr />

				<div className="addDom">
					<button onClick={this._addDom}>addDom</button>
					<div id="showMount" ref="showMount" style={{display: disN}}></div>
						<div className="addDiv" ref="addDiv" style={{width: 200, height: 200, border: '1px solid #ccc' }}>
					</div>
				</div>
				
			</div>
		)
	}

}

class NextChild extends Component{
	constructor(props){
		super(props);
		this.state={
			propsMsg: 'hhh NextChild',
			display: true
		}
	}

	componentDidMount(){
		console.log('NextChild')
	}

	// 将用户发送的表情包转义
	_showEmoji = () => {
		console.log('requireContext', requireEmoji)
		console.log('emojis', emojis)
		//console.log(requireContext.keys().map(requireContext))
		//console.log('images', images)
		//console.log(emojis)
	}

	_showH = () => {
		const { display } = this.state
		this.setState({
			display: !display
		})
	}

	render(){

		const { emojis, display } = this.state
		let m = display ? '1' : '0'
		return(
			<div>
				<h2 style={{opacity: m }}>this is Child</h2>
				<div className="con">
					<button onClick={this._showEmoji}>shwoEmoji</button>
					<img src={images} alt="|" title="logo" style={{width: 30, height: 30}} />
					<button onClick={this._showH}>showH</button>
				</div>
				<hr />
				<Emoji emojis={emojis} />

			</div>
		)

	}
}

export default NextChild