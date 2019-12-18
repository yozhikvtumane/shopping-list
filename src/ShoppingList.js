import React, { Component, Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './Header'
import NewItem from './NewItem'
import SingleItem from './SingleItem'
import Calls from './calls'
import Spinner from '@atlaskit/spinner'
import Loading from './Loading'
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

		this.state = {
			
			styling: {
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight
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
						this.setState({error: err.stack})
					})
		}
		
		/*If items array is created in localStorage and is not empty*/
		if (JSON.parse(localStorage.items).length !== 0) {
			
			/*first, sync it with server data */
			return Calls.getShoppingList()
						.then( res => {
							this.setState({items: [...res], isLoading: false})	
						})
						.catch( err => {
							this.setState({error: err.stack})
						})
		} else {
			/*If it's empty, try to fetch data from server*/
			return Calls.getShoppingList()	
						.then( res => {
							this.setState({items: [...res], isLoading: false})	
						})
						.catch( err => {
							this.setState({error: err.stack})	
						})
		}
	}
	
	componentDidUpdate() {
		localStorage.setItem('items', JSON.stringify(this.state.items))
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
			console.log("item", item)
			console.log("item.id", item.id)
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
			MainFrameLoader =	<MainFrame windowHeight={this.state.styling.windowHeight} >
									<StyledLoadingSpinner>
										<Spinner size="large"/>
									</StyledLoadingSpinner>
								</MainFrame>
		} else {
			MainFrameLoader = 	<MainFrame windowHeight={this.state.styling.windowHeight} >
									<NewItem onItemCreate={this.handleItemCreate}/>
									{this.renderItems()}
								</MainFrame>
		} 
				
		return(
			<Fragment>
				<GlobalStyle />
				<Header onSave={this.handleSave} showSpinner={this.state.showSpinner}/>
				{MainFrameLoader}
			</Fragment>
			
		)
	}
}

export default ShoppingList