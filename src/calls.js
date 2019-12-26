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
                    resolve(response.json())
                })
                .catch(error => {
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

    deleteShoppingItem(dtoIn) {
        return Calls.call("delete", this.getUri("shoppingItem"), dtoIn);
    },

    createShoppingItem(dtoIn) {
        return Calls.call("post", this.getUri("shoppingItem"), dtoIn)
    },

    updateShoppingItem(dtoIn) {
        return Calls.call("put", this.getUri("shoppingItem"), dtoIn);
    }
};

export default Calls;