'use strict'

import mongoose, { Schema } from 'mongoose'

const UsuarioSchema = new Schema({
    nombre    : {type: String, required: true},
    apellido  : {type: String, required: true},
    email     : { type: String, required: true},
    direccion : {type: String, required: true},
    telefono  : {type: String, required: true},
    password  : { type: String, required: true},    
    Create_at : {type: Date,require: true, default: Date.now}

})

export default mongoose.model('Usuario', UsuarioSchema)

