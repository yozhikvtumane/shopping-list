import React, { Component, Fragment } from 'react'
// import Button from '@atlaskit/button'
import Button, { Theme as ButtonTheme } from '@atlaskit/button';

import { Checkbox } from '@atlaskit/checkbox'
import merge from 'lodash.merge'
import AddIcon from '@atlaskit/icon/glyph/add'
import styled from 'styled-components'
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import EditorEditIcon from '@atlaskit/icon/glyph/editor/edit'
import { colors } from '@atlaskit/theme'
import Appereance from '@atlaskit/theme'

import Amounter from './Amounter'
/*button colors #ff7c4a - delete, #c4ee87 - green */

console.log("Appereance", Appereance)
console.log("defaultProps", Button.defaultProps)

const newButtonStyles = {
	warning: {
		background: {
		  default: colors.R300,
		  hover: colors.R400,
		  active: colors.R500,
		},
		color: {
			default: colors.N500,
			hover: colors.N700,
			active: "#333"
		},
		marginLeft: {
			default: "auto",
			hover: "auto",
			active: "auto"
		}
	  }
  };

const customButtonTheme = (currentTheme, themeProps) => {
//   const spinnerStyles = currentTheme
	console.log("themeProps", themeProps)
	console.log("currentTheme", currentTheme)

	let {appereance, state} = themeProps

	// console.log("apperarnce, mode, state", appearance, mode, state)

	const { buttonStyles, spinnerStyles } = currentTheme(themeProps);

	let stateStyle = {
		...buttonStyles,
		background: newButtonStyles[appereance].background[state],
		color: newButtonStyles[appereance].color[state],
		marginLeft: newButtonStyles[appereance].marginLeft[state]
		// boxShadow: newButtonStyles[appereance].boxShadow[state],
		// transform: newButtonStyles[appereance].transform[state],
		// transition: newButtonStyles[appereance].transition[state]

	}

	console.log("buttonStyles", buttonStyles)
		return {
			buttonStyles: {
			...stateStyle
			// ...extract(buttonStyles, themeProps)
			},
			spinnerStyles,
		}
}
const StyledSingleItem = styled.div`
	display: flex;
	align-items: center;
	
	width: 100%;
	padding: 0.5em 1em;
	background-color: ${props => props.bgcGrey === "grey" ? "#fbfcfd;" : "#fff;"};
		
	border-bottom: 1px solid #eef0f5;
`
const StyledItemText = styled.span`
	width: 50%;
	font-size: 20px;
	overflow: hidden;
	margin-right: 0.5em;
	text-decoration: ${props => props.done ? "line-through" : "none"}
`

const StyledControlsWrapper = styled.div`
	margin-left: auto;
`

const newThemeTokens = {
	icon: {
		size: 'large'
	}
}

const customTheme = ((current, props) => {
	const themeTokens = current(props)
	return merge({}, themeTokens, newThemeTokens)
})

class SingleItem extends Component {

	constructor(props) {
		super(props)
		this.amountHandler = this.amountHandler.bind(this)
		this.handleCheck = this.handleCheck.bind(this)
	}
	
	amountHandler(newAmount) {
		this.props.amountHandler(this.props.id, newAmount)
	}
	
	handleCheck(e) {
		console.dir(e.target.checked)
		this.props.onDone(this.props.id, e.target.checked)
	}
	
	render() {
		return(
			<StyledSingleItem bgcGrey={this.props.bgcGrey} >
				<Checkbox theme={customTheme} onChange={this.handleCheck}/>
				<StyledItemText done={this.props.done}>{this.props.textValue}</StyledItemText>
				<Amounter amountValue={this.props.amountValue} amountHandler={this.amountHandler}/>
				<StyledControlsWrapper>
					{/* <ButtonTheme.Provider value={customButtonTheme}> */}
						<Button theme={customButtonTheme} iconBefore={<EditorRemoveIcon />} appereance="warning" />
					{/* </ButtonTheme.Provider> */}
				</StyledControlsWrapper>
			</StyledSingleItem>			
		)
	}
}

export default SingleItem