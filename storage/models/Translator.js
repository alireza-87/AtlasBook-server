const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let TranslatorSchema = mongoose.Schema({
    tid: { type: Number, default: 100 },
    name: String,
    desc: String,
    image: String,
})

module.exports = mongoose.model('model_translator', TranslatorSchema, "model_translator");