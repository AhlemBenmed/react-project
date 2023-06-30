import { ErrorRequestHandler
 } from "express"

const express = require('express')
const app = express()
const port = 5173
const cors = require('cors');
const merchant_model = require('./database')

app.use(express.json())
app.use(function (req:any, res:any, next:any) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/mainpage', (req:any, res:any) => {
  merchant_model.getMerchants()
  .then((Response:any) => {
    res.status(200).send(Response);
  })
  .catch((Error:ErrorRequestHandler) => {
    res.status(500).send(Error);
  })
})

app.post('/merchants', (req:any, res:any) => {
  merchant_model.createMerchant(req.body)
  .then((Response:any) => {
    res.status(200).send(Response);
  })
  .catch((Error:ErrorRequestHandler) => {
    res.status(500).send(Error);
  })
})

app.delete('/merchants/signin', (req:any, res:any) => {
  merchant_model.deleteMerchant(req.body)
  .then((Response:any)=> {
    res.status(200).send(Response);
  })
  .catch((Error:ErrorRequestHandler) => {
    res.status(500).send(Error);
  })
})
app.post('/merchants/pass', (req:any, res:any) => {
  merchant_model.editMerchant(req.body)
  .then((Response:any)=> {
    res.status(200).send(Response);
  })
  .catch((Error:ErrorRequestHandler) => {
    res.status(500).send(Error);
  })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
app.use(cors({
  origin: 'http://127.0.0.1:5173'
}));


