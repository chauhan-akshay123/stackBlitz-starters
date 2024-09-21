const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let taxRate = 5 // 5%
let discount = 10 // 10%
let loyaltyRate = 2 // 2 points per $1

app.get('/cart-total', (req, res)=>{
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = cartTotal + newItemPrice;
  res.send(result.toString());
});

function getDiscount(cartTotal, isMember){
  if(isMember){
     return (cartTotal - (cartTotal*discount)/100);
  }
  else{
     return cartTotal;
  }
}

app.get('/membership-discount', (req, res)=>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";
  let result = getDiscount(cartTotal, isMember);
  res.send(result.toString());
});

app.get('/calculate-tax', (req, res)=>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = cartTotal*taxRate / 100;
  res.send(result.toString());
});

app.get('/estimate-delivery', (req, res)=>{
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let result;
  if(shippingMethod == "express"){
    result = distance / 100;   
  }
  else{
    result = distance / 50;
  }
  res.send(result.toString());
});

app.get('/shipping-cost', (req, res)=>{
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;
  res.send(result.toString());
});

app.get('/loyalty-points', (req, res)=>{
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = purchaseAmount * 2;
  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
