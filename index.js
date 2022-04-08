const express = require("express");
const app = express()
const port = process.env.PORT || 3000
const router = require('./router')
const mongoose = require("mongoose");
const cors = require("cors");
const uri = "mongodb+srv://jord2097:9Y8ML4kvEPcTqR99@cluster0.q2ktn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json());
app.use(router);

app.get('/test', (req,res) => res.send("This is a test!"));

mongoose.connect(uri)
app.listen(port, () =>
    console.log(`Example app listening on http://localhost:${port}`)
)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function callback() {
    console.log("Database Connected")
})