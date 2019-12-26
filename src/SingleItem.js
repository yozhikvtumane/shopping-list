import React from 'react'
import styled from 'styled-components'
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import Amounter from './Amounter'
import ThemedButton from './ThemedButton'
import ThemedCheckbox from './ThemedCheckbox'

const StyledSingleItem = styled.div`
	display: flex;
	align-items: center;
	
	width: 100%;
	padding: 0.5em 1em;
	background-color: ${props => props.bgcGrey === "grey" ? "#fbfcfd" : "#fff"};
	opacity: ${props => props.done ? "0.3" : "1"};
	border-bottom: 1px solid #eef0f5;
`
const StyledItemText = styled.span`
	width: 50%;
	font-size: 20px;
	overflow: hidden;
	margin-right: 0.5em;
	text-decoration: ${props => props.done ? "line-through" : "none"}
`

const StyledControlsWrapper = styled.div`
	margin-left: auto;
`

export default function(props) {
	const {bgcGrey, done, textValue, amountValue, id} = props
	
	const amountHandler = (newAmount) => {
		props.amountHandler(id, newAmount)
	}
	
	const handleCheck = (e) => {
		props.onDone(id, e.target.checked)
	}
	
	const handleDelete = () => {
		props.onDelete(id)
	}
	
	return(
		<StyledSingleItem bgcGrey={bgcGrey} key={id} done={done}>
			<ThemedCheckbox
				onChange={handleCheck}
				done={done}/>
			<StyledItemText done={done}>{textValue}</StyledItemText>
			<Amounter
				amountValue={amountValue}
				amountHandler={amountHandler}/>
			<StyledControlsWrapper>
				<ThemedButton
					iconBefore={<EditorRemoveIcon />}
					appearance="warning"
					onClick={handleDelete}
				/>
			</StyledControlsWrapper>
		</StyledSingleItem>			
	)
}
