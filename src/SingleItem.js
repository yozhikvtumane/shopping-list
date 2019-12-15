import React, { Component } from 'react'
import styled from 'styled-components'
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import Amounter from './Amounter'
import ThemedButton from './ThemedButton'
import ThemedCheckbox from './ThemedCheckbox'

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

class SingleItem extends Component {

	constructor(props) {
		super(props)
		this.amountHandler = this.amountHandler.bind(this)
		this.handleCheck = this.handleCheck.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}
	
	amountHandler(newAmount) {
		this.props.amountHandler(this.props.id, newAmount)
	}
	
	handleCheck(e) {
		this.props.onDone(this.props.id, e.target.checked)
	}
	
	handleDelete() {
		this.props.onDelete(this.props.id)
	}
	
	render() {
		return(
			<StyledSingleItem bgcGrey={this.props.bgcGrey} >
				<ThemedCheckbox onChange={this.handleCheck} done={this.props.done}/>
				<StyledItemText done={this.props.done}>{this.props.textValue}</StyledItemText>
				<Amounter amountValue={this.props.amountValue} amountHandler={this.amountHandler}/>
				<StyledControlsWrapper>
					<ThemedButton iconBefore={<EditorRemoveIcon />} appearance="warning" onClick={this.handleDelete}/>
				</StyledControlsWrapper>
			</StyledSingleItem>			
		)
	}
}

export default SingleItem