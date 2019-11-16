'use strict'

import mongoose, { Schema } from 'mongoose'

const UsuarioSchema = new Schema({
    nombre    : {type: String, required: true},
    apellido  : {type: String, required: true},
    email     : { type: String, required: true},
    direccion : {type: String, required: true},
    telefono  : {type: String, required: true},
    password  : { type: String, required: true},
    rol       : {type: String, required: true, default: 'regular', enum: [ 'regular','Administrador']},
    Create_at : {type: Date,required: true, default: Date.now}

})

export default mongoose.model('Usuario', UsuarioSchema)


