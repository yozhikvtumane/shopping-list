import React from 'react'
import Button from '@atlaskit/button';
import { colors } from '@atlaskit/theme'

const newButtonStyles = {
	warning: {
		background: {
			default: colors.R300,
			hover: colors.R400,
			active: colors.R500,
		},
		
		color: {
			default: colors.N500,
			hover: colors.N700,
			active: "#333"
		},
		
		marginLeft: {
			default: "auto",
			hover: "auto",
			active: "auto"
		}
	},
	add: {
		background: {
			default: colors.G75,
			hover: colors.G100,
			active: colors.G200,
			disabled: colors.G50
		},
		marginLeft: {
			default: "auto",
			hover: "auto",
			active: "auto",
			disabled: "auto"
		}
	},
	cloud: {},
	plus: {
		background: {
			default: colors.T50,
			hover: colors.T75,
			active: colors.T75,
			disabled: colors.T50
		},
	},
	minus: {
		background: {
			default: colors.T50,
			hover: colors.T75,
			active: colors.T75,
			disabled: colors.T50
		},
	}
	
};

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
	const { type, appearance, iconBefore, onClick, isLoading, isDisabled, children } = props
	
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