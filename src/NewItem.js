/*
	NewItem component - handles creation of new shopping list item, internal state is used to keep item's text value, amount, id.
	Amount and text are passed from child components - ItemText and AmountHandler
*/


import React, { Component, Fragment } from 'react'
import Button from '@atlaskit/button'
import AddIcon from '@atlaskit/icon/glyph/add'
import styled from 'styled-components'
import Amounter from "./Amounter"

const StyledFormWrapper = styled.div`
	width: 100%;
`

class NewItem extends Component {
	constructor() {
		super()
		this.recieveAmount = this.recieveAmount.bind(this)
		this.state = {
			amount: null	
		}	
	}
	
	recieveAmount(num) {
		console.log(num)
		this.setState({
			amount: num
		})
	}
	
	render() {
		return (
			<StyledFormWrapper>
				<form action="">
					<input type="text" placeholder="I want to buy..."/>
					<Amounter amountHandler={this.recieveAmount}/>
					<Button iconBefore={<AddIcon />}>Add Item</Button>
				</form>
			</StyledFormWrapper>
		)
	}
}

export default NewItem
