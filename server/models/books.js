let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    description: String,
    genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
