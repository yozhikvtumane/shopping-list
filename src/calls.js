let Calls = {
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    async call(method, url, dtoIn) {
        let body;
        if (dtoIn) {
            body = JSON.stringify(dtoIn);
        }

        let response = await fetch(url, {
            method: method,
            body: body,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
        });
        return await response.json();
    },

    getUri: function (useCase) {
        return (
            "http://localhost:5000/" + useCase
        );
    },

    getShoppingList(dtoIn) {
		return new Promise( (resolve, reject) => {
			resolve(Calls.call("get", this.getUri("shoppingList"), dtoIn))
			reject("Error in Promise getShoppingList(), file: calls.js")
		})
    },
	
    async deleteShoppingItem(dtoIn) {
		let commandUri = this.getUri("shoppingItem");
        return await Calls.call("delete", commandUri, dtoIn);
    },
	
    uploadShoppingList(dtoIn) {
		return new Promise( (resolve, reject) => {
			resolve(Calls.call("post", this.getUri("shoppingList"), dtoIn));
			reject("Error in Promise uploadShoppingList(), file: calls.js")
		})
    },

    async updateShoppingItem(dtoIn) {
        let commandUri = this.getUri("shoppingItem");
        return await Calls.call("put", commandUri, dtoIn);
    }
};

export default Calls;