const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let BooksSchema = mongoose.Schema({
    bid: { type: Number, default: 100 },
    name: String,
    desc: String,
    fileName: String,
    catg: Number,
    image: String,
    auther: {
        type: Schema.Types.ObjectId,
        ref: "model_auther"
    },
    translator: {
        type: Schema.Types.ObjectId,
        ref: "model_translator"
    }

})

module.exports = mongoose.model('model_books', BooksSchema, "model_books");