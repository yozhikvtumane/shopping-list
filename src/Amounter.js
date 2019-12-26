import React, { Fragment } from 'react'
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add'
import EditorHorizontalRuleIcon from '@atlaskit/icon/glyph/editor/horizontal-rule'
import ThemedButton from './ThemedButton'
import styled from 'styled-components'


/* @TODO:
	◘ condition less than 1
	
	◘ you should accept the current value as a prop, which lets the parent e.g. reset it to 0, just by updating its own state
*/
const StyledAmountInput = styled.input.attrs(props => ({
	type: "number",
	value: props.value,
	className: "customNumberInput", /* This classname is used in global styles to remove up-down arrows in input[type=number]*/
}))`
	width: 36px;
	margin-right: 4px;
	margin-left: 4px;
	text-align: center;
	font-size: 24px;
	font-weight: 300;
	border: none;
	border-bottom: 1px solid #f0ebf8;
	border-radius: 3px;
`

export default function(props) {
	const {isDisabled, amountValue, amountHandler} = props
	
	const amountPlus = () => {
		return amountHandler(amountValue + 1)
	}
	
	const amountMinus = () => {
		if (amountValue > 0) return amountHandler(amountValue - 1)
		return
	}
	
	return (
		<Fragment>
			<ThemedButton iconBefore={<EditorAddIcon />} onClick={amountPlus} isDisabled={isDisabled} appearance="plus"/>
			<StyledAmountInput type="number"  value={amountValue} />
			<ThemedButton iconBefore={ <EditorHorizontalRuleIcon/> } onClick={amountMinus} isDisabled={isDisabled} appearance="minus"/>
		</Fragment>
	)
}