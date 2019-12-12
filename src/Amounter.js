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

const StyledAmountInput = styled.input.attrs(props => ({
	type: "number",
	value: props.value,
	className: "customNumberInput", /* This classname is used in global styles to remove au-down arrows in input[type=number]*/
	
}))`
	width: 36px;
	margin-right: 4px;
	margin-left: 4px;
	text-align: center;
	font-size: 24px;
	font-weight: 300;
	border: none;
	border-bottom: 1px solid #f0ebf8;
`

export default function(props) {
	const amountPlus = () => {
		console.log("props.amountHandler", props.amountHandler)
		return props.amountHandler(props.amountValue + 1)
	}
	
	const amountMinus = () => {
		if (props.amountValue > 0) return props.amountHandler(props.amountValue - 1)
		return
	}
	
	return (
		<Fragment>
			<Button iconBefore={<EditorAddIcon />} onClick={amountPlus}/>
			<StyledAmountInput type="number"  value={props.amountValue} />
			<Button iconBefore={ <EditorHorizontalRuleIcon/> } onClick={amountMinus} />
		</Fragment>
	)
}