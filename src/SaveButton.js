/*
	SaveButton component - handles server calls to save data.
	Disabled when no changes to the list have been made.
	Spinner loader show the process of saving data.
*/

import React, { Component, Fragment } from 'react'
import Button from '@atlaskit/button'
import UploadIcon from '@atlaskit/icon/glyph/upload'

class SaveButton extends Component {
	render() {
		return(
			<Button iconBefore={<UploadIcon />}>Save this list</Button>
		)
	}
}

export default SaveButton