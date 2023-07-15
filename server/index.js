const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const JokeModel = require('./model')

app.use(express.json())
app.use(cors({origin: '*'}))

const connection = process.env.DB_CONNECTION
const password = process.env.ADMIN_PW
const newJoke = process.env.NEW_JOKE
const PORT = process.env.PORT || 3001

mongoose.connect(connection, {
    useNewUrlParser: true
})

const authLogin = (password) => {
    return (req, res, next) => {
        const input = req.body.input
        if (input === password) {
            next()
        } 
    }
}

app.get('/', (req, res) => {
    JokeModel.find().then(result => res.send(result)).catch(err => console.log(err))
})

app.post(`/${newJoke}`, async (req, res) => {
    try {
        const joke = await JokeModel.create(req.body)
        res.status(200).json(joke)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/login', authLogin(`${password}`), (req, res) => {
    res.send({ newJoke })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
