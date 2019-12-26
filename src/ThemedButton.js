import React from 'react'
import Button from '@atlaskit/button'
import { newButtonStyles } from './ThemedComponents'


const customButtonTheme = (currentTheme, themeProps) => {
	let {appearance, state} = themeProps
	const { buttonStyles, spinnerStyles } = currentTheme(themeProps);

	return {
		buttonStyles: {
			...buttonStyles,
			...extract(newButtonStyles, appearance, state)
		},
		spinnerStyles: {
			...spinnerStyles
		}
	}
}


function extract(newTheme, appearance, state) {
	if (!newTheme[appearance]) return
	const root = newTheme[appearance]
	
	return Object.keys(root).reduce((acc, val) => {
		let node = root;
		
		[val, state].forEach(item => {
			if (!node[item]) return
			
			if (typeof node[item] !== 'object') {
				acc[val] = node[item]
				return
			}
			
			node = node[item]
			return
		})
		
		return acc
	}, {})
  }


export default function(props) {
	const { type, appearance, iconBefore, onClick, isDisabled, children } = props
	
	return (
		<Button
			type={type}
			theme={customButtonTheme}
			appearance={appearance}
			iconBefore={iconBefore}
			onClick={onClick}
			isDisabled={isDisabled}
		>
			{children ? children : null}
		</Button>
	)
}