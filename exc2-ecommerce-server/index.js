const express = require("express");
const app = express();
const PORT = 3001;

app.use((req, res) => {
    console.log("we got a new request");
    res.send("HELLO");
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
})