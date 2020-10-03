const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let AutherSchema = mongoose.Schema({
    aid: { type: Number, default: 100 },
    name: String,
    desc: String,
    image: String,
})

module.exports = mongoose.model('model_auther', AutherSchema, "model_auther");