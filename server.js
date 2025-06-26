const { log } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Read port from .env file
const port = process.env.PORT || 3000;

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://127.0.0.1:27017/formdata')
const db = mongoose.connection
db.once('open', () => {
    console.log("mongodb connected");

})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    comments: String
})

const User = mongoose.model("data", userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/post',async (req, res) => {
    const { name, email, number, comments } = req.body;
    const user = new User ({
        name,
        email,
        number,
        comments
    })
    await user.save()
    console.log(user);
    res.send("form submition success fully")
})

app.listen(port, () => {
    console.log("server stardet");
})