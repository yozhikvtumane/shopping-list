/*
	Header component - wrapper for app's title and save button component
*/

import React from 'react'
import styled from 'styled-components'
import Spinner from '@atlaskit/spinner'

const StyledHeader = styled.header.attrs(props => ({
	
}))`
	display: flex;
	flex-wrap: no-wrap;
	justify-content: space-between;
	align-items: center;
	
	width: 100%;
	padding-top: 2em;
`

export default class Header extends React.Component {
	constructor(props) {
		super(props)
		this.headerRef = React.createRef()
	}
	
	componentDidMount() {
		this.props.getHeaderHeight(this.headerRef.current.clientHeight)
	}
	
	render() {
		return (
			<StyledHeader ref={this.headerRef}>
				<h1>Shopping List</h1>
				<Spinner size="medium" isCompleting={!this.props.showSpinner}/>
			</StyledHeader>
		)
	}
}