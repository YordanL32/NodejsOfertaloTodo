const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const {ObjectId} = Schema;

var categoriaSchema = new Schema({
  
   /*  publicacion_id:{type: ObjectId}, */
    nombre: {type: String},    
    Create_at : {type: Date,require: true, default: Date.now}
})
module.exports = mongoose.model('Categorias', categoriaSchema );