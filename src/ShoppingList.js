import React, { Component, Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './Header'
import NewItem from './NewItem'
import SingleItem from './SingleItem'
import Calls from './calls'
import Spinner from '@atlaskit/spinner'

/* @Todo:
	• Move header to standalone component
	• Make amount counter as a standalone component with plus-minus buttons stateless
	• Item Delete handler
	• ThemedButton - move buttons to ThemedButton component, render depending on props
	• ThemedCheckBox - move checkbox  to ThemedCheckbox component, render icon size dep. on props.
	• Server saving handler
	◘ Server calls refactoring
	◘ Move all styled-components code to StyledComponents component, import where necessery
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
	
	@media (max-width: 1400px) {
		#root {width: 70%;}	
	}
	
	@media (max-width: 1100px) {
		#root {width: 80%;}	
	}
		
	@media (max-width: 640px) {
		#root {width: 90%;}	
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
	min-height: ${props => props.windowHeight - props.headerHeight}px;
	background-color: #fff;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 16px 0px;
`
const StyledLoadingState = styled.div`
	width: 100%;
	text-align: center;
	padding-top: 2em;
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
		this.getHeaderHeight = this.getHeaderHeight.bind(this)

		this.state = {
			
			styling: {
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight,
				mainFrameHeight: null,
				headerHeight: null
			},
			
			items: [],
			isLoading: false,
			showSpinner: false,
			error: null
			
		}
	}
	componentDidMount() {
		
		this.setState({isLoading: true})
		this.setState({isLoading: false})
		
	}
	
	getHeaderHeight(height) {
		this.setState(state => {
				return {styling: { ...this.state.styling, headerHeight: height}}
			}
		)
	}
	
	handleItemCreate(item) {
		this.setState( () => {
			return { items: [...this.state.items, item] }
		})
	}

	recieveAmount(id, num) {

		const listItems = [...this.state.items].map(item => {
			if (id === item.id) item.amount = num
			
			return item
		})
		
		this.setState( () => {
			return { items : [...listItems] }
		})
	}
	
	doneHandler(id, doneState) {
		const listItems = [...this.state.items].map(item => {
			if (id === item.id) item.done = doneState
			
			return item
		})
		
		this.setState( () => {
			return { items : [...listItems] }
		})
	}
	
	deleteHandler(id) {
		const listItems = [...this.state.items].filter(item => item.id !== id)
		
		this.setState( () => {
			return { items : [...listItems] }
		})
	}
	
	renderItems() {
		const listItems = [...this.state.items]

		const renderedItems = listItems.map( (item, i) => {
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
		let MainFrameLoader;
		const {isLoading, styling, showSpinner, error} = this.state;
		
		if (isLoading) {
			MainFrameLoader = (
				<MainFrame windowHeight={styling.windowHeight} headerHeight={styling.headerHeight}>
					<StyledLoadingState>
						<Spinner size="large"/>
					</StyledLoadingState>
				</MainFrame>
			)
		} else if (error) {
			MainFrameLoader = (
				<MainFrame windowHeight={styling.windowHeight} headerHeight={styling.headerHeight}>
					<StyledLoadingState>
						<div>{error}</div>
					</StyledLoadingState>
				</MainFrame>
			)
			
		} else {
			MainFrameLoader = (
				<MainFrame windowHeight={styling.windowHeight} headerHeight={styling.headerHeight}>
					<NewItem onItemCreate={this.handleItemCreate}/>
					{this.renderItems()}
				</MainFrame>
			)
		} 
				
		return(
			<Fragment>
				<GlobalStyle />
				<Header 
					onSave={this.handleSave}
					showSpinner={showSpinner}
					getHeaderHeight={this.getHeaderHeight}
				/>
				{MainFrameLoader}
			</Fragment>
		)
	}
}

export default ShoppingList