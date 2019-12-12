import React, { Component, Fragment } from 'react'
import Button from '@atlaskit/button'

import { Checkbox } from '@atlaskit/checkbox'
import merge from 'lodash.merge'
import AddIcon from '@atlaskit/icon/glyph/add'
import styled from 'styled-components'
import Amounter from './Amounter'

const newThemeTokens = {
	icon: {
		size: 'large'
	}
}

const customTheme = ((current, props) => {
	const themeTokens = current(props)
	return merge({}, themeTokens, newThemeTokens)
})

class SingleItem extends Component {
	constructor(props) {
		super(props)
		this.amountHandler = this.amountHandler.bind(this)
	}
	
	amountHandler(newAmount) {
		// console.log("e", e)
		console.log("amountHandler() SingleItem", this.props.amountValue)
		this.props.amountHandler(this.props.id, newAmount)
	}

	render() {
		return(
			<div>
				<Checkbox theme={customTheme} />
				<span>{this.props.textValue}</span>
				
				<Amounter amountValue={this.props.amountValue} amountHandler={this.amountHandler}/>
				<div className="controlsWrapper">
					<span>del icon</span>
				</div>
			</div>			
		)
	}
}

export default SingleItem