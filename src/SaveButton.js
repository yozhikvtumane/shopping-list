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