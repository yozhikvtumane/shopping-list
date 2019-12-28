const call = (method, url, data) => {
	const body = JSON.stringify(data)
	
	const response = new Promise((resolve, reject) => {
		fetch(url, {
			method,
			body,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		})
		.then( response => resolve(response.json()) )
		.catch( error => reject(error) )
	})
	
	return response
}

const host = 'http://localhost:5050'
const getUri = useCase => `${host}/${useCase}`
const getShoppingList = data => call('get', getUri('shoppingList/item'))
const createShoppingItem = data => call('post', getUri('shoppingList/item'), data)
const updateShoppingItem = (id, data) => call('put', getUri(`shoppingList/item/${id}`), data)
const deleteShoppingItem = data => call('delete', getUri(`shoppingList/item/${data.id}`))

export default {
	call,
	getShoppingList,
	deleteShoppingItem,
	createShoppingItem,
	updateShoppingItem
}