const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var comentarioSchema = new Schema({
  
    publicacion_id:{type: Schema.ObjectId,require:true, ref: 'Publicacion' }, 
    texto: {type: String},
    Create_at : {type: Date,require: true, default: Date.now},
    user: { type: Schema.ObjectId,require:true, ref: 'Usuario' }
})

module.exports = mongoose.model('Comentarios', comentarioSchema );