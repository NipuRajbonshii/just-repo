const express = require('express');

const app = express();
require('dotenv').config()


app.use(express.json());

const teas = [];
let Index = 1;

app.post('/add-tea', (req, res, next) => {
  console.log(req.url, req.method);
  const { name, price} = req.body;
  const newTea = { id: Index++, name, price};
  teas.push(newTea);
  res.status(200).send(newTea);
})

app.get('/teas', (req, res, next) => {
    console.log(req.url, req.method);
  res.status(200).send(teas);
})

app.get('/teas/:id', (req, res, next) => {
   console.log(req.url, req.method);
  const foundDat = teas.find(t => t.id === parseInt(req.params.id));
  if(!foundDat){
    return res.status(404).send('Unable to find the tea!');
  }

  res.status(200).send(foundDat);
})

app.put('/teas/:id', (req, res, next) => {
  const foundDat = teas.find(t => t.id === parseInt(req.params.id));
  if(!foundDat){
    return res.status(404).send('Unable to find the tea!');
  }

  const { name, price } = req.body;
  foundDat.name = name;
  foundDat.price = price
  res.status(200).send(foundDat);
})

app.delete('/teas/:id', (req, res, next) => {
  const index = parseInt(req.params.id);
  if(index < 1 || index > teas.length){
    return res.status(404).send('invalid index!')
  }
  const delTea = teas.splice(index -1, 1);
  res.status(200).send(delTea[0]);
})



const PORT = process.env.PORT || 3000 ;
const hostName = '127.0.0.1'

app.listen(PORT, hostName, () => {
  console.log(`Server is running at http://${hostName}:${PORT}`);
})