const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let CatgSchema = mongoose.Schema({
    cid: { type: Number, default: 100 },
    name: String,
    desc: String,
    image: String,
    isEnable: { type: Number, default: 1 },
})

module.exports = mongoose.model('model_catg', CatgSchema, "model_catg");