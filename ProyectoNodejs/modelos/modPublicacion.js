const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var publicacionSchema = new Schema({
    titulo: String,
    texto: String,
    imagen: String,
    Create_at : {type: Date,require: true, default: Date.now},
    idUsuario: {type: Schema.ObjectId, ref: 'usuarios'}
})
module.exports = mongoose.model('publicaciones', publicacionSchema );