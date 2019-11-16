const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LikesSchema = new Schema({
  
    publicacion_id:{type: Schema.ObjectId,require:true, ref: 'Publicacion' },
    user: { type: Schema.ObjectId,require:true, ref: 'Usuario' }, 
    cantLikes: {type: Number, default: 0 },
    estado: {type: Boolean, default: false },
    Create_at : {type: Date,require: true, default: Date.now}
    
})

module.exports = mongoose.model('Likes', LikesSchema );