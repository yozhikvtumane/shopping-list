/*
	NewItem component - handles creation of new shopping list item, internal state is used to keep item's text value, amount, id.
	Amount and text are passed from child components - ItemText and AmountHandler
*/


import React, { Component, Fragment } from 'react'
import Button from '@atlaskit/button'
import AddIcon from '@atlaskit/icon/glyph/add'
import styled from 'styled-components'
import Amounter from "./Amounter"
import uniqueid from 'lodash.uniqueid'

const StyledFormWrapper = styled.div`
	width: 100%;
	margin-bottom: 2px;
	padding: 1em 1.2em;
	box-shadow: 0px 2px 2px 0px #efefef;
`

const StyledSubmitButton = styled(Button).attrs( props => ({
	type: "submit"
}))`
	margin-left: auto;
	background-color: #333;
`
const StyledForm = styled.form.attrs(props => ({
	onSubmit: props.onSubmit,
}))`
	display: flex;
	
	width: 100%;
`

const StyledTextInput = styled.input.attrs(props => (
	{
		type: "text",
		placeholder: "I want to buy...",
		value: props.value,
		onChange: props.onChange
	}
))`
	width: 50%;
	margin-right: 12px;
	font-size: 24px;
	font-weight: 300;
	border: none;
	border-bottom: 1px solid #f0ebf8;
`

class NewItem extends Component {
	constructor(props) {
		super(props)
		
		this.recieveAmount = this.recieveAmount.bind(this)
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		
		this.state = {
				id: uniqueid('listItem_'),
				amount: 1,
				textValue: "",
				done: false
		}
		
		console.dir(this.state)
	}
	
	recieveAmount(num) {
		this.setState( () => {
			return {amount: num}
		})
	}
	
	handleTextChange(e) {
		console.log("handleTextChange state" , this.state)
		this.setState({
			textValue: e.target.value
		})
	}
	
	handleSubmit(e) {
		
		e.preventDefault()
		if (this.state.textValue === "") return
		if (typeof this.props.onItemCreate === 'function') {
			console.log('handleSubmit state', this.state)
			this.props.onItemCreate(this.state)
			this.setState({
					id: uniqueid('listItem_'),
					amount: 1,
					textValue: ""
				})
		}
	}
	
	render() {
		return (
			<StyledFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
					<StyledTextInput value={this.state.textValue} onChange={this.handleTextChange}/>
					<Amounter amountValue={this.state.amount} amountHandler={this.recieveAmount}/>
					<StyledSubmitButton iconBefore={<AddIcon />}>Add Item</StyledSubmitButton>
				</StyledForm>
			</StyledFormWrapper>
		)
	}
}

export default NewItem
