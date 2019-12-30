import React, { Component, Fragment } from 'react'
import Header from '../components/Header'
import NewItem from '../components/NewItem'
import SingleItem from '../components/SingleItem'
import Spinner from '@atlaskit/spinner'
import { GlobalStyle, MainFrame, StyledLoadingState} from '../styles/StyledComponents'
import Calls from '../utils/calls'

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
			.then( (res) => this.setState({items: res, isLoading: false}) )
			.catch( (err) => this.setState({error: err.stack, isLoading: false}) )
	}
	
	getHeaderHeight(height) {
		this.setState({ styling: { ...this.state.styling, headerHeight: height} })
	}
	
	handleItemCreate(item) {
		this.setState({ showSpinner: true})
		
		Calls.createShoppingItem(item)
			.then( (response) => {
				this.setState({ 
					items: [...this.state.items, response],
					showSpinner: false
				})
			})
			.catch((err) => this.setState({error: err.stack, showSpinner: false}))
	}

	recieveAmount(id, amount) {
		this.setState({showSpinner: true}, () => {
			Calls.updateShoppingItem(id, {amount})
					.then( (response) => {
						const items = [...this.state.items].map(item => (item.id === id ? { id, ...response } : item))
						this.setState({ showSpinner: false, items })
					
					})
					.catch( (err) => this.setState({error: err.stack}))
		})
	}
	
	doneHandler(id, done) {
		this.setState({showSpinner: true}, () => {
			Calls.updateShoppingItem(id, {done})
				.then( (response) => { 
					const items = [...this.state.items].map(item => (item.id === id ? { id, ...response } : item))
					this.setState({ showSpinner: false, items })
				
				})
				.catch( (err) => this.setState({error: err.stack}))
			}
		)
	}
	
	deleteHandler(id) {
		this.setState({showSpinner: true}, () => {
			Calls.deleteShoppingItem({id})
				.then( (response) => {
					const items = this.state.items.filter(item => item.id !== response.id)
					this.setState({ items, showSpinner: false })
				})
				.catch( (err) => this.setState({error: err.stack}))
		})
	}
	
	renderItems() {
		const listItems = [...this.state.items]

		const renderedItems = listItems.map( (item, i) => {
			return (
				<SingleItem
					id={item.id}
					key={item.id}
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