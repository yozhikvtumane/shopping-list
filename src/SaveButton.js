/*
	SaveButton component - handles server calls to save data.
	Disabled when no changes to the list have been made.
	Spinner loader show the process of saving data.
*/

import React from 'react'
// import Button from '@atlaskit/button'
import ThemedButton from './ThemedButton'
import UploadIcon from '@atlaskit/icon/glyph/upload'
import Spinner from '@atlaskit/spinner'

export default function(props) {
	return(
		<ThemedButton
			onClick={props.onClick}
			// isLoading={props.isLoading}
			isDisabled={props.showSpinner === true ?  true : false }
			iconBefore={ props.showSpinner === true ?  <Spinner /> : <UploadIcon /> }
		>
			Save this list
		</ThemedButton>
	)
}