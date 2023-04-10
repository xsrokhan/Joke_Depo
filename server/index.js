const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const JokeModel = require('./model')

app.use(express.json())
app.use(cors())

const connection = process.env.DB_CONNECTION

mongoose.connect(connection, {
    useNewUrlParser: true
})

app.get('/', (req, res) => {
    JokeModel.find().then(result => res.send(result)).catch(err => console.log(err))
})

app.post('/newJoke', async (req, res) => {
    try {
        const joke = await JokeModel.create(req.body)
        res.status(200).json(joke)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(3001, () => {
    console.log("Server running on port 3001")
})
