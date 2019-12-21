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
	• Localstorage handler
	• Server saving handler
	◘ Server worker on window close
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
const StyledLoadingSpinner = styled.div`
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
		this.handleSave = this.handleSave.bind(this)
		this.getHeaderHeight = this.getHeaderHeight.bind(this)
		this.handlePageUnload = this.handlePageUnload.bind(this)

		this.state = {
			
			styling: {
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight,
				mainFrameHeight: null,
				headerHeight: null
			},
			
			items: [],
			saved: false,
			isLoading: false,
			showSpinner: false,
			error: null
			
		}
	}
	componentDidMount() {
		
		/* WARNING: SPAGHETTI CODE AHEAD!*/
		this.setState({isLoading: true})
		
		window.addEventListener('beforeunload', this.handlePageUnload)
		/* If items array doesn't exist in localStorage, then create it and return */
		if (localStorage.items === undefined) {
			/*Probably there is need to be server call in case the cache was cleaned up*/
			return Calls.getShoppingList()
					.then( res => {
						console.log("localStorage.items === undefined, res.length", res.length)
						if (res.length > 0) {
							this.setState({items: [...res], isLoading: false})	
						} else {
							localStorage.setItem('items', "[]")
							this.setState({isLoading: false})
						}
					})
					.catch( err => {
						console.dir(err)
						this.setState({error: err.stack, isLoading: false})
					})
		}
		
		/*If items array is created in localStorage and is not empty*/
		if (JSON.parse(localStorage.items).length !== 0) {
			
			/*first, sync it with server data */
			return Calls.getShoppingList()
						.then( res => {
							console.log('JSON.parse(localStorage.items).length !== 0')
							this.setState({items: [...res], isLoading: false})	
						})
						.catch( err => {
							this.setState({error: err.stack, isLoading: false})
						})
		} else {
			/*If it's empty, try to fetch data from server*/
			return Calls.getShoppingList()	
						.then( res => {
							this.setState({items: [...res], isLoading: false})	
						})
						.catch( err => {
							this.setState({error: err.stack, isLoading: false})	
						})
		}
		
	}
	
	
	componentWillUnmount() {
		console.log('unmounting')
		window.removeEventListener('beforeunload', this.handlePageUnload);
	}
	
	componentDidUpdate() {
		localStorage.setItem('items', JSON.stringify(this.state.items))
	}
	
	handlePageUnload(e) {
		// console.log()
		console.log("unloadind", e)
		let saveData = JSON.parse(localStorage.items)
		navigator.serviceWorker.controller.postMessage({
			type: 'save',
			save: saveData,
			slot: 1
		  });
	}
	
	getHeaderHeight(height) {
		this.setState(state => {
				return {styling: { ...this.state.styling, headerHeight: height}}
			}
		)
		console.log('state', this.state)
	}
	
	handleItemCreate(item) {
		this.setState( () => {
			return { items: [...this.state.items, item], saved: false }
		})
	}

	recieveAmount(id, num) {

		let listItems = [...this.state.items].map(item => {
			if (id === item.id) {
				item.amount = num
			}
			return item
		})
		
		this.setState( () => {
			return { items : [...listItems], saved: false }
		})
	}
	
	doneHandler(id, doneState) {
		let listItems = [...this.state.items].map(item => {
			if (id === item.id) {
				item.done = doneState
			}
			return item
		})
		
		this.setState( () => {
			return { items : [...listItems], saved: false }
		})
	}
	
	deleteHandler(id) {
		let listItems = [...this.state.items].filter(item => {
			return item.id !== id
		})
		
		this.setState( () => {
			return { items : [...listItems], saved: false }
		})
	}
	
	handleSave() {
		this.setState({showSpinner: true})
		
		Calls.uploadShoppingList(this.state.items)
			.then(res => {
				this.setState({showSpinner: false})
				return res
			
			}).catch(err => err)
	}
	
	renderItems() {
		let listItems = [...this.state.items]

		let renderedItems = listItems.map( (item, i) => {
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
		// console.log("this.state.isLoading", this.state.isLoading)
		
		
		
		if (this.state.isLoading) {
			MainFrameLoader =	<MainFrame windowHeight={this.state.styling.windowHeight} headerHeight={this.state.styling.headerHeight}>
									<StyledLoadingSpinner>
										<Spinner size="large"/>
									</StyledLoadingSpinner>
								</MainFrame>
		} else if (this.state.error) {
			MainFrameLoader =	<MainFrame windowHeight={this.state.styling.windowHeight} headerHeight={this.state.styling.headerHeight}>
									<div>{this.state.error}</div>
								</MainFrame>
			
		} else {
			MainFrameLoader = 	<MainFrame windowHeight={this.state.styling.windowHeight} headerHeight={this.state.styling.headerHeight}>
									<NewItem onItemCreate={this.handleItemCreate}/>
									{this.renderItems()}
								</MainFrame>
		} 
				
		return(
			<Fragment>
				<GlobalStyle />
				<Header 
					onSave={this.handleSave}
					showSpinner={this.state.showSpinner}
					getHeaderHeight={this.getHeaderHeight}
				/>
				{MainFrameLoader}
			</Fragment>
			
		)
	}
}

export default ShoppingList