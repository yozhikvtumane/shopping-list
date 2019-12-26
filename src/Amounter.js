import React, { Fragment } from 'react'
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add'
import EditorHorizontalRuleIcon from '@atlaskit/icon/glyph/editor/horizontal-rule'
import ThemedButton from './ThemedButton'
import { StyledAmountInput } from './StyledComponents'

/* @TODO:
	◘ condition less than 1
	
	◘ you should accept the current value as a prop, which lets the parent e.g. reset it to 0, just by updating its own state
*/


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
			<StyledAmountInput type="number"  value={amountValue} readOnly/>
			<ThemedButton iconBefore={ <EditorHorizontalRuleIcon/> } onClick={amountMinus} isDisabled={isDisabled} appearance="minus"/>
		</Fragment>
	)
}