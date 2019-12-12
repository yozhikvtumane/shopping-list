import React, { Component, Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { Checkbox } from '@atlaskit/checkbox'
import merge from 'lodash.merge'
import Header from './Header'
import NewItem from './NewItem'
import SingleItem from './SingleItem'
/* @Todo:
	◘ Move header to standalone component
	• Make amount counter as a standalone component with plus-minus buttons stateless
*/

/*
	Styling
*/

/* Custom theme for checkbox*/

const newThemeTokens = {
	icon: {
		size: 'large'
	}
}

const customTheme = ((current, props) => {
	const themeTokens = current(props)
	return merge({}, themeTokens, newThemeTokens)
})

/* Global styles for body */

export const GlobalStyle = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');

	* {
		box-sizing: border-box;
		outline: none;
	}

	body {
		font-family: 'Poppins', sans-serif;
		background-color: #f0ebf8;
		color: #333;
	}

	#root {
		width: 50%;
		margin: 0 auto;
	}
	
	input.customNumberInput::-webkit-outer-spin-button,
	input.customNumberInput::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input.customNumberInput {
		-moz-appearance:textfield;
	}
`

/* Style for main app element */


// border-top: 1px solid rgba(23, 162, 184, 0.3);
// border-right: 1px solid rgba(23, 162, 184, 0.3);
// border-left: 1px solid rgba(23, 162, 184, 0.3);


const MainFrame = styled.div`
	height: ${props => props.windowHeight}px;
	background-color: #fff;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 16px 0px;
`

/* Component declaration */

class ShoppingList extends Component {
	constructor() {
		super()
		this.handleItemCreate = this.handleItemCreate.bind(this)
		this.renderItems = this.renderItems.bind(this)
		this.recieveAmount = this.recieveAmount.bind(this)

		this.state = {
			
			styling: {
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight
			},
			
			items: [],
			saved: false,

		}
		
		console.log(this.state)
	}
	
	// componentDidMount() {
		
	// }
	handleItemCreate(item) {
		this.setState({
			items: [...this.state.items, item]
		})
	}

	recieveAmount(id, num) {

		// let itemToChange = this.state.items.filter()
		console.log("recieveAMount", id, num)
		let listItems = [...this.state.items].map(item => {
			if (id === item.id) {
				item.amount = num
			}
			return item
		})
		console.log("listItems", listItems)
		this.setState( (state) => {
			// console.log("set state callback", state, props, id, num)
			return { items : [...listItems] }
		})
	}

	renderItems() {
		let listItems = [...this.state.items]

		let renderedItems = listItems.map(item => {
			console.log("this.recieveAmount", this.recieveAmount)
			return (
			<SingleItem id={item.id} amountValue={item.amount} textValue={item.textValue} amountHandler={this.recieveAmount}/>
		)})

		return renderedItems
	}


	render() {
		return(
			<Fragment>
				<GlobalStyle />
				<Header />
				<MainFrame windowHeight={this.state.styling.windowHeight}>
					{/* NewItem type: input */}
					<NewItem onItemCreate={this.handleItemCreate}/>
					{/* ListItem */}
					{this.renderItems()}
					<div>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti praesentium repellendus obcaecati fugiat? Architecto, culpa. Nisi voluptatum excepturi alias commodi blanditiis tempora ullam, quidem natus aliquid, saepe optio in quis?</p>
						<Checkbox theme={customTheme} />
					</div>
				</MainFrame>
			</Fragment>
		)
	}
}

export default ShoppingList