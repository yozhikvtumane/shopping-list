import React from 'react'
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove'
import Amounter from './Amounter'
import ThemedButton from './ThemedButton'
import ThemedCheckbox from './ThemedCheckbox'
import { StyledSingleItem, StyledItemText, StyledControlsWrapper} from '../styles/StyledComponents'

export default function(props) {
	const {bgcGrey, done, textValue, amountValue, id} = props
	
	const amountHandler = (newAmount) => props.amountHandler(id, newAmount)
	const handleCheck = (e) => props.onDone(id, e.target.checked)
	const handleDelete = () => props.onDelete(id)
	
	return(
		<StyledSingleItem bgcGrey={bgcGrey} key={id} done={done}>
			<ThemedCheckbox
				onChange={handleCheck}
				done={done}/>
			<StyledItemText done={done}>{textValue}</StyledItemText>
			<Amounter
				amountValue={amountValue}
				amountHandler={amountHandler}
				isDisabled={done}/>
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
