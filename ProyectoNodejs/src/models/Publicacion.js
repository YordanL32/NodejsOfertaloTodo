const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var publicacionSchema = new Schema({
    titulo: {type: String, require:true},
    descripcion: {type: String, require:true},
    /* imagen: String, */
    Create_at : {type: Date,require: true, default: Date.now},
    user: {type: String} 
})
module.exports = mongoose.model('Publicacion', publicacionSchema );