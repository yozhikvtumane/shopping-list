import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');

	* {
		box-sizing: border-box;
		outline: none;
	}

	body {
		font-family: 'Poppins', sans-serif;
		background-color: #f0ebf8;
		color: #333;
	}
	
	input.customNumberInput::-webkit-outer-spin-button,
	input.customNumberInput::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	
	input.customNumberInput {
		-moz-appearance:textfield;
	}
	
	#root {
		width: 50%;
		margin: 0 auto;
	}
	
	@media (max-width: 1400px) {
		#root {width: 70%;}	
	}
	
	@media (max-width: 1100px) {
		#root {width: 80%;}	
	}
		
	@media (max-width: 640px) {
		#root {width: 90%;}	
	}
	
`

export const MainFrame = styled.div`
	min-height: ${props => props.windowHeight - props.headerHeight}px;
	background-color: #fff;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 16px 0px;
`
export const StyledLoadingState = styled.div`
	width: 100%;
	text-align: center;
	padding-top: 2em;
`
export const StyledHeader = styled.header.attrs(props => ({
	
}))`
	display: flex;
	flex-wrap: no-wrap;
	justify-content: space-between;
	align-items: center;
	
	width: 100%;
	padding-top: 2em;
`
export const StyledFormWrapper = styled.div`
	width: 100%;
	margin-bottom: 2px;
	padding: 1em 1.2em;
	box-shadow: 0px 2px 2px 0px #efefef;
`

export const StyledForm = styled.form.attrs(props => ({
	onSubmit: props.onSubmit,
}))`
	display: flex;
	
	width: 100%;
`

export const StyledTextInput = styled.input.attrs(props => (
	{
		type: "text",
		placeholder: "I want to buy...",
		value: props.value,
		onChange: props.onChange
	}
))`
	width: 50%;
	margin-right: 12px;
	font-size: 24px;
	font-weight: 300;
	border: none;
	border-bottom: 1px solid #f0ebf8;
`


export const StyledSingleItem = styled.div`
	display: flex;
	align-items: center;
	
	width: 100%;
	padding: 0.5em 1em;
	background-color: ${props => props.bgcGrey === "grey" ? "#fbfcfd" : "#fff"};
	opacity: ${props => props.done ? "0.3" : "1"};
	border-bottom: 1px solid #eef0f5;
`
export const StyledItemText = styled.span`
	width: 50%;
	font-size: 20px;
	overflow: hidden;
	margin-right: 0.5em;
	text-decoration: ${props => props.done ? "line-through" : "none"}
`

export const StyledControlsWrapper = styled.div`
	margin-left: auto;
`

export const StyledAmountInput = styled.input.attrs(props => ({
	type: "number",
	value: props.value,
	className: "customNumberInput", /* This classname is used in global styles to remove up-down arrows in input[type=number]*/
}))`
	width: 36px;
	margin-right: 4px;
	margin-left: 4px;
	text-align: center;
	font-size: 24px;
	font-weight: 300;
	border: none;
	border-bottom: 1px solid #f0ebf8;
	border-radius: 3px;
`