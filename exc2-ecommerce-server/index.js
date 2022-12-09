const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;

app.use((req, res) => {
    console.log("we got a new request");
    res.send("HELLO");
});

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(() => {
        console.log("mongo connection opened");
    }).catch(err => {
        console.log(`failed to open connection: `, err)
    })

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
})