import React, { Component, Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './Header'
import NewItem from './NewItem'
import SingleItem from './SingleItem'
/* @Todo:
	• Move header to standalone component
	• Make amount counter as a standalone component with plus-minus buttons stateless
	• Item Delete handler
	• ThemedButton - move buttons to ThemedButton component, render depending on props
	• ThemedCheckBox - move checkbox  to ThemedCheckbox component, render icon size dep. on props.
	◘ Disable Amounter on item.done === true
	◘ Move all styled-components code to StyledComponents component, import where necessery
	◘ Localstorage handler
	◘ Server saving handler
*/

/*
	Styling
*/

/* Global styles for body */

const GlobalStyle = createGlobalStyle`
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

const MainFrame = styled.div`
	min-height: ${props => props.windowHeight}px;
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
		this.doneHandler = this.doneHandler.bind(this)
		this.deleteHandler = this.deleteHandler.bind(this)

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
	
	componentWillMount() {
		if (localStorage.appData) {
			this.setState(() => {
				return JSON.parse(localStorage.appData)
			})
		} else {
			return
		}
	}
	
	componentDidUpdate() {
		localStorage.setItem('appData', JSON.stringify(this.state))
	}

	handleItemCreate(item) {
		this.setState( () => {
			return { items: [...this.state.items, item] }
		})
	}

	recieveAmount(id, num) {

		let listItems = [...this.state.items].map(item => {
			if (id === item.id) {
				item.amount = num
			}
			return item
		})
		
		this.setState( (state) => {
			return { items : [...listItems] }
		})
	}
	
	doneHandler(id, doneState) {
		let listItems = [...this.state.items].map(item => {
			if (id === item.id) {
				item.done = doneState
			}
			return item
		})
		
		this.setState( (state) => {
			return { items : [...listItems] }
		})
	}
	
	deleteHandler(id) {
		let listItems = [...this.state.items].filter(item => {
			return item.id !== id
		})
		
		this.setState( (state) => {
			return { items : [...listItems] }
		})
	}
	
	renderItems() {
		let listItems = [...this.state.items]

		let renderedItems = listItems.map( (item, i) => {
			console.log("this.recieveAmount", this.recieveAmount)
			
			return (
				<SingleItem
					id={item.id}
					amountValue={item.amount}
					textValue={item.textValue}
					onDone={this.doneHandler}
					onDelete={this.deleteHandler}
					done={item.done}
					amountHandler={this.recieveAmount}
					bgcGrey={i % 2 === 0 ? "grey" : "white"}
				/>
			)
		})

		return renderedItems
	}

	render() {
		return(
			<Fragment>
				<GlobalStyle />
				<Header />
				<MainFrame windowHeight={this.state.styling.windowHeight}>
					<NewItem onItemCreate={this.handleItemCreate}/>
					{this.renderItems()}
				</MainFrame>
			</Fragment>
		)
	}
}

export default ShoppingList