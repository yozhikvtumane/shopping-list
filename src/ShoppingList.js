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
	• Add opacity to item on done
	• disable buttons on done
	◘ move calls to one method
*/

/*
	Styling
*/

/* Global styles */

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
	
	input.customNumberInput::-webkit-outer-spin-button,
	input.customNumberInput::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	
	input.customNumberInput {
		-moz-appearance:textfield;
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
		
		Calls.getShoppingList()
			.then(res => {
				this.setState({items: res, isLoading: false})
			})
			.catch(err => {
				this.setState( () => {
					return {error: err.stack, isLoading: false}
				})
			})
		
	}
	
	getHeaderHeight(height) {
		this.setState({ styling: { ...this.state.styling, headerHeight: height} })
	}
	
	handleItemCreate(item) {
		this.setState( () => {
			return { showSpinner: true, items: [...this.state.items, item] }
		})
		
		Calls.createShoppingItem(item)
			.then(() => this.setState({showSpinner: false}))
			.catch(err => {
				this.setState(() => {
					return {error: err.stack, showSpinner: false}
				})
			})
	}

	recieveAmount(id, num) {
		let changedListItem
		const listItems = [...this.state.items].map(item => {
			if (id === item.id) {
				item.amount = num
				changedListItem = item
			}
			
			return item
		})
		
		this.setState({ 
				items : [...listItems],
				showSpinner: true
			}, () => {
				return Calls.updateShoppingItem(changedListItem)
						.then( () => this.setState({showSpinner: false}))
						.catch( (err) => this.setState({error: err.stack}))
			})
	}
	
	doneHandler(id, doneState) {
		let changedListItem
		const listItems = [...this.state.items].map(item => {
			if (id === item.id) {
				item.done = doneState
				changedListItem = item
			}
			
			return item
		})
		
		this.setState({ 
				items : [...listItems],
				showSpinner: true
			}, () => {
				return Calls.updateShoppingItem(changedListItem)
						.then( () => this.setState({showSpinner: false}))
						.catch( (err) => this.setState({error: err.stack}))
				
			})
	}
	
	deleteHandler(id) {
		let itemTodelete
		const listItems = [...this.state.items].filter(item => {
			if (item.id !== id) itemTodelete = item
			return item.id !== id
		})
		
		this.setState({ 
			items : [...listItems],
			showSpinner: true
		}, () => {
			return Calls.deleteShoppingItem(itemTodelete)
					.then( () => this.setState({showSpinner: false}))
					.catch( (err) => this.setState({error: err.stack}))
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
		let mainFrameLoader
		const {isLoading, styling, showSpinner, error} = this.state
		
		if (isLoading) {
			mainFrameLoader = (
				<MainFrame windowHeight={styling.windowHeight} headerHeight={styling.headerHeight}>
					<StyledLoadingState>
						<Spinner size="large"/>
					</StyledLoadingState>
				</MainFrame>
			)
		} else if (error) {
			mainFrameLoader = (
				<MainFrame windowHeight={styling.windowHeight} headerHeight={styling.headerHeight}>
					<StyledLoadingState>
						<div>{error}</div>
					</StyledLoadingState>
				</MainFrame>
			)
			
		} else {
			mainFrameLoader = (
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
					showSpinner={showSpinner}
					getHeaderHeight={this.getHeaderHeight}
				/>
				{mainFrameLoader}
			</Fragment>
		)
	}
}

export default ShoppingList