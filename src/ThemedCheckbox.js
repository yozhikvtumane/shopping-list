import React from 'react'
import { Checkbox } from '@atlaskit/checkbox'
import merge from 'lodash.merge'

const newThemeTokens = {
	icon: {
		size: 'large'
	}
}

const customTheme = ((current, props) => {
	const themeTokens = current(props)
	return merge({}, themeTokens, newThemeTokens)
})

export default function(props) {
	const { onChange, done } = props
	
	return(
		<Checkbox theme={customTheme} onChange={onChange} isChecked={done}/>
	)
}