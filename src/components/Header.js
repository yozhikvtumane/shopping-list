import React from 'react'
import Spinner from '@atlaskit/spinner'
import { StyledHeader } from "../styles/StyledComponents"


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