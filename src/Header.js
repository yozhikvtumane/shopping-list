/*
	Header component - wrapper for app's title and save button component
*/

import React from 'react'
import styled from 'styled-components'
import SaveButton from './SaveButton'

const StyledHeader = styled.header`
	display: flex;
	flex-wrap: no-wrap;
	justify-content: space-between;
	align-items: center;
	
	width: 100%;
	padding-top: 2em;
`

export default function(props) {
	return (
		<StyledHeader>
			<h1>Shopping List</h1>
			<SaveButton onClick={props.onSave} showSpinner={props.showSpinner}/>
		</StyledHeader>
	)
}