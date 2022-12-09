const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Order = require("./models/Order");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(() => {
        console.log("mongo connection opened");
    }).catch(err => {
        console.log(`failed to open connection: `, err)
    })

app.get('/products', async (req, res) => {
    const products = await Product.find();
    console.log(products);
    res.status(200).json(products)
})

app.post('/placeOrder', async (req, res) => {
    const { name, address, phone, orderProducts } = req.body;
    console.log(req.body)
    const newOrder = new Order({ name, address, phone, orderProducts })
    newOrder.save()
    res.status(200).json(newOrder)
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
})