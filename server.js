const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const port = process.env.PORT || 5050;

// app.use(express.static(path.join(__dirname, 'build'), {maxAge: "30d"}));


app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  // Pass to next layer of middleware
  next();
});


// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/shoppinglist/item', (req, res) => {
  const data = getData();
  const sendData = Object.keys(data).map(id => ({ id, ...data[id] }));
  res.send(sendData);
})

app.get('/shoppinglist/item/:id', (req, res) => {
  const data = getData()
  const id = req.params.id
  
  if (data[id] === undefined) {
    return res.status(404).send({ message: `Missing item with id: ${id}` })
  }
  
  res.send({ id, ...data[id] })
})

app.post("/shoppingList/item", (req, res) => {
  const data = getData();
  const id = `listItem_${new Date().getTime()}`;
  data[id] = req.body;
  saveData(data);
  res.send({id, ...data[id]});
});

app.put("/shoppingList/item/:id", (req, res) => {
  let data = getData();
  let id = req.params.id;
  
  if (data[id] === undefined) {
    return res.status(404).send({ message: `Missing item with id: ${id}` })
  }
  
  const { id: newId, ...newItem } = req.body;
  
  if (newId && id !== newId) {
    console.warn(`Different item's ID provided '${id}' and '${newId}'`)
  }
  
  data[id] = { ...data[id], ...newItem }
  saveData(data);
  res.send({ ...data[id], id});
});

app.delete("/shoppingList/item/:id", (req, res) => {
  let data = getData();
  let id = req.params.id;
  
  if (data[id] === undefined) {
    return res.status(404).send({ message: `Missing item with id: ${id}` });
  }
  
  const { [id]: value, ...otherData } = data;
  saveData(otherData);
  res.send({ id, ...value });
});

function getData(){
  let text = fs.readFileSync('./data/data.json','utf8');
  let response = JSON.parse(text);
  return response;
}

function saveData(data){
  fs.writeFileSync(
      "./data/data.json",
      JSON.stringify(data, null, 2),
      "utf-8"
  );
}

app.listen(port, () => console.log(`Listening on port ${port}`));