'use strict'
import { Usuario } from "../models";
//import Debug from 'debug'
//const debug = new Debug('usuario:server:api:usuario')

export default{
    find: () => {
      return Usuario.find().sort({ fecha: -1 });
    },

    findById: (_id) => {
        return Usuario.findById(_id);
    },

    create: q => {
        //debug(`Creating new usuario`);
        const data = new Usuario(q);
        return data.save();
    },

    update: q => {
        //debug(`Updating the usuario with id: ${q._id}`);
        return Usuario.updateOne({ _id: q._id }, { $set: q });
    },
    
    delete: _id => {
        //debug(`Removing the usuario with id: ${_id}`);
        return Usuario.findOneAndRemove({ _id });
      }
    };
      
    
