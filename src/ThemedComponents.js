import { colors } from '@atlaskit/theme'

export const newButtonStyles = {
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
	
}
