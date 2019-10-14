const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const {ObjectId} = Schema;

var comentarioSchema = new Schema({
  
    publicacion_id:{type: ObjectId},
    name: {type: String},
    email: {type: String},
    gravatar: {type: String},
    comentario: {type: String},
    Create_at : {type: Date,require: true, default: Date.now},
    user: {type: String} 
})

module.exports = mongoose.model('Comentarios', comentarioSchema );