import React, { Component, Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { Checkbox } from '@atlaskit/checkbox'
import merge from 'lodash.merge'
import Header from './Header'
import NewItem from './NewItem'
/* @Todo:
	◘ Move header to standalone component
	Make amount counter as a standalone component with plus-minus buttons (internal state)
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
	}

	body {
		font-family: 'Poppins', sans-serif;
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

const MainFrame = styled.div`
	height: ${props => props.windowHeight}px;
	border-top: 1px solid rgba(23, 162, 184, 0.3);
	border-right: 1px solid rgba(23, 162, 184, 0.3);
	border-left: 1px solid rgba(23, 162, 184, 0.3);
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 16px 0px;
`

/* Component declaration */

class ShoppingList extends Component {
	constructor() {
		super()
		this.state = {
			styling: {
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight
			}
		}
		
		console.log(this.state)
	}
	
	// componentDidMount() {
		
	// }
	
	render() {
		return(
			<Fragment>
				<GlobalStyle />
				<Header />
				<MainFrame windowHeight={this.state.styling.windowHeight}>
					{/* NewItem type: input */}
					<NewItem />
					{/* ListItem */}
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