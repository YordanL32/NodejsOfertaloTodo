'use strict'

import express from 'express'
import { Usuario , Publicacion } from '../api'
import { handleError } from '../utils'
import {Auth} from '../middleware'
import { Login } from '../services'




const app = express.Router()
app.get("/:id", async (req, res) => {
  try {
    const data = await Usuario.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'An error ocurred',
      error: error.toString()
    });
  }
});
//ver publicaciones de catalogo 
  app.get('/',/*  Auth.isUsuario, */ async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      let usu = await Login.decodeTok(token)
      console.log('Id del token :: '+ usu.sub)
        let usuario= usu.sub 
      
      const data = await Usuario.miCatalogo(usuario)
      res.status(200).json(data)
    } catch (error) {
      handleError(error, res)
    }
  });
  
  export default app;


