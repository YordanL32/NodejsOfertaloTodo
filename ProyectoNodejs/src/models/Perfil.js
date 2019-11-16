const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const path = require('path');

var perfilSchema = new Schema({
    sexo: {type: String, require:true},
    usuario:{ type: Schema.ObjectId,require:true, ref: "Usuario" },
    fecha_nacimiento : {type: Date,require: true},
    Created_at : {type: Date,require: true, default: Date.now},
})

module.exports = mongoose.model('Perfil', perfilSchema );