const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    Create_at : {type: Date,require: true, default: Date.now}
});
module.exports = mongoose.model('usuarios', usuarioSchema );