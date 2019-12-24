let Calls = {
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    call(method, url, dtoIn) {
        let body;
        if (dtoIn) {
            body = JSON.stringify(dtoIn);
        }

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                body: body,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json"
                },
            })
                .then(response => {
                    console.log("calls.js response", response)
                    
                    resolve(response.json())
                })
                .catch(error => {
                    console.log("calls.js error")
                    console.dir(error)
                    reject(error)
                })
        } )
        
    },

    getUri: function (useCase) {
        return (
            "http://localhost:5050/" + useCase
        );
    },

    getShoppingList(dtoIn) {
        return Calls.call("get", this.getUri("shoppingList"), dtoIn)
    },

    async deleteShoppingItem(dtoIn) {
        let commandUri = this.getUri("shoppingItem");
        return await Calls.call("delete", commandUri, dtoIn);
    },

    createShoppingItem(dtoIn) {
        return Calls.call("post", this.getUri("shoppingItem"), dtoIn)
    },

    updateShoppingItem(dtoIn) {
        return Calls.call("put", this.getUri("shoppingItem"), dtoIn);
    }
};

export default Calls;