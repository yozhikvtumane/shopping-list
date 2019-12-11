import React, { Component, Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import SaveButton from './SaveButton'

const StyledHeader = styled.header`
	display: flex;
	flex-wrap: no-wrap;
	justify-content: space-between;
	align-items: center;
	
	width: 100%;
	padding-top: 2em;
`

class Header extends Component {
	
	render() {
		return (
			<StyledHeader>
				<h1>Shopping List</h1>
				<SaveButton />
			</StyledHeader>
		)
	}
}

export default Header