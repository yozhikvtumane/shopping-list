import React, { Component } from 'react'
import AddIcon from '@atlaskit/icon/glyph/add'
import ThemedButton from './ThemedButton'
import Amounter from "./Amounter"
import { StyledTextInput, StyledForm, StyledFormWrapper } from "./StyledComponents";


class NewItem extends Component {
	constructor(props) {
		super(props)
		
		this.recieveAmount = this.recieveAmount.bind(this)
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		
		this.state = {
				id: 'listItem_' + Date.now().toString(),
				amount: 1,
				textValue: "",
				done: false
		}
	}
	
	recieveAmount(num) {
		this.setState( () => {
			return { amount: num }
		})
	}
	
	handleTextChange(e) {
		this.setState({
			textValue: e.target.value
		})
	}
	
	handleSubmit(e) {
		
		e.preventDefault()
		if (this.state.textValue === "") return
		if (typeof this.props.onItemCreate === 'function') {
			this.props.onItemCreate(this.state)
			this.setState({
					id: 'listItem_' + Date.now().toString(),
					amount: 1,
					textValue: ""
				})
		}
	}
	
	render() {
		const { textValue, amount } = this.state
		return (
			<StyledFormWrapper>
				<StyledForm onSubmit={this.handleSubmit}>
					<StyledTextInput value={textValue} onChange={this.handleTextChange}/>
					<Amounter amountValue={amount} amountHandler={this.recieveAmount}/>
					<ThemedButton
						type="submit"
						iconBefore={<AddIcon />}
						appearance="add"
						isDisabled={textValue === "" ? true : false}
					>
						Add Item
					</ThemedButton>
				</StyledForm>
			</StyledFormWrapper>
		)
	}
}

export default NewItem
