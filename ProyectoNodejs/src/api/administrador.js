'use strict'

import { Admin } from '../models'
import Debug from 'debug'
import { Login } from '../services'

const debug = new Debug('notasdb:server:api:Admin')

export default {
  find: () => {
    // debug(`Finding Admins for homepage with limit.`)
    return Admin.find().sort({ fecha: -1 });
  },

  findById: (_id) => {
    // debug(`Find Admin with id: ${_id}`)
    return Admin.findById(_id)
  },

  create: (q) => {
    // debug(`creando nuevo administrador`)
    return Admin.findOne({email:q.email})
    .then(function(usuario){
      if(usuario)
        return {message:'El usuario ya existe'}
      else{
        const usuario = new Admin(q)
        return usuario.save()
      }
    })
  },
  
  update: (q) => {
    debug(`Updating the retiros with id: ${q._id}`)
    return Admin.updateOne({ _id: q._id }, { $set: q })
  },

  delete: (_id) => {
    debug(`Removing the Admin with id: ${_id}`)
    return Admin.findOneAndRemove({ _id })
  }
}