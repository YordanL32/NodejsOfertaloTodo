const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    status: {type: Boolean,require: true, default: true},
    Create_at : {type: Date,require: true, default: Date.now}
});
usuarioSchema.path('nombre').validate(
    function(nom){
        return ((nom!="") && (nom!=null));
    }
);

module.exports = mongoose.model('usuarios', usuarioSchema );