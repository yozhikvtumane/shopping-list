/*
	SaveButton component - handles server calls to save data.
	Disabled when no changes to the list have been made.
	Spinner loader show the process of saving data.
*/

import React, { Component, Fragment } from 'react'
// import Button from '@atlaskit/button'
import ThemedButton from './ThemedButton'
import UploadIcon from '@atlaskit/icon/glyph/upload'

export default function(props) {
	return(
		<ThemedButton onClick={props.onClick} iconBefore={<UploadIcon />}>Save this list</ThemedButton>
	)
}