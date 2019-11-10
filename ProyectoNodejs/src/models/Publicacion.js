const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const path = require('path');

var publicacionSchema = new Schema({
    titulo: {type: String, require:true},
    descripcion: {type: String, require:true},
    imagen: {type: String},
    categoria:{ type: Schema.ObjectId,require:true, ref: "Categorias" },
    precio: {type: Number},
    vistas: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    Create_at : {type: Date,require: true, default: Date.now},
   /*  user: {type: String}  */
})
publicacionSchema.virtual('uniqueId')
  .get(function () {
    return this.imagen.replace(path.extname(this.imagen), '');
  });

module.exports = mongoose.model('Publicacion', publicacionSchema );