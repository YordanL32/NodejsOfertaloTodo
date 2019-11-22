const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var compartirSchema = new Schema({
    titulo: {type: String, require:true},
    titulo2: {type: String, require:true},
    descripcion: {type: String, require:true},
    delUsuario: {type: String, require:true},
    imagen: {type: String},
    categoria:{ type: Schema.ObjectId,require:true, ref: 'Categorias' },
    precio: {type: Number},
    user: {type: Schema.ObjectId,require:true, ref: 'Usuario'},
    Create_at : {type: Date,require: true, default: Date.now}
})

module.exports = mongoose.model('compartir', compartirSchema  );