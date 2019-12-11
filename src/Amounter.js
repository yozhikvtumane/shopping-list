import React, { Component, Fragment } from 'react'
import Button from '@atlaskit/button'
// import UploadIcon from '@atlaskit/icon/glyph/upload'
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add'
import EditorHorizontalRuleIcon from '@atlaskit/icon/glyph/editor/horizontal-rule';
import styled from 'styled-components'


/* @TODO:
	◘ condition less than 1
	
	◘ you should accept the current value as a prop, which lets the parent e.g. reset it to 0, just by updating its own state
*/

// const StyledAmountNumber = styled.input.attrs( (props) => {
// 	console.log("props from styledNumber", props)
//   return (
// 	{
// 		type: "number",
// 		max: "",
// 		min: "1",
// 		step: "1",
// 		value: props.value,
// 		// onChange: props.onChange,
// 		className: "customNumberInput", /* This classname is used in global styles to remove au-down arrows in input[type=number]*/
// 	}
// )})`

// `

class Amounter extends Component {
	constructor(props) {
		super(props)
		console.log("constructor props", props)
		this.amountPlus = this.amountPlus.bind(this)
		this.amountMinus = this.amountMinus.bind(this)
		this.handleAmountChange = this.handleAmountChange.bind(this)
		
		this.state = {
			amountValue: 1
		}	
	}
	
	amountPlus() {
		this.setState({
			amountValue: this.state.amountValue + 1
		})
	}
	
	amountMinus() {
		this.setState({
			amountValue: this.state.amountValue - 1
		})
	}
	
	handleAmountChange() {
		console.log("handleAmountChange change")
		this.props.amountHandler(this.state.amountValue)
	}
	
	render() {
		return (
			<Fragment>
				
				<Button iconBefore={<EditorAddIcon />} onClick={this.amountPlus}/>
				{/* <StyledAmountNumber value={this.state.amountValue} onChange={this.handleAmountChange} /> */}
				<input type="number"  value={this.state.amountValue} onChange={this.handleAmountChange} />
				<Button iconBefore={ <EditorHorizontalRuleIcon/> } onClick={this.amountMinus} />
			</Fragment>
		)
	}
}

export default Amounter