import React, { Component, Fragment } from 'react'
// import Button from '@atlaskit/button'
import Button from '@atlaskit/button';

import { Checkbox } from '@atlaskit/checkbox'
import merge from 'lodash.merge'
import AddIcon from '@atlaskit/icon/glyph/add'
import styled from 'styled-components'
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import EditorEditIcon from '@atlaskit/icon/glyph/editor/edit'
import { colors } from '@atlaskit/theme'
// import appearance from '@atlaskit/theme'

import Amounter from './Amounter'
/*button colors #ff7c4a - delete, #c4ee87 - green */

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
		spinnerStyles,
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
	return (
		<Button
			type={props.type}
			theme={customButtonTheme}
			appearance={props.appearance}
			iconBefore={props.iconBefore}
			onClick={props.onClick}
			isDisabled={props.isDisabled}
		>
		{props.children ? props.children : null}
		</Button>
	)
}