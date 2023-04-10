const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    lang: {
        type: String,
        required: true
    },
    joke: {
        type: String,
        required: true
    }
})

const Joke = mongoose.model("jokes", TestSchema)
module.exports = Joke