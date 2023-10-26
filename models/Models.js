const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author'
    }
})

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports.Book = mongoose.model('book', BookSchema);
module.exports.Author = mongoose.model('author', AuthorSchema);