'use strict'

import express from 'express'
import { Usuario } from '../api'
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
app.get('/',/*  Auth.isUsuario, */ async (req, res) => {
    try {
      const data = await Usuario.find()
      res.status(200).json(data)
    } catch (error) {
      handleError(error, res)
    }
  });
  app.get('/refresh/:_id', async (req, res) => {
      console.log('pasa')
      const token = req.headers.authorization.split(' ')[1]
      console.log(token)
      Login.decodeTokenPer(token)
      .then(response => {
      Usuario.findById(response.sub)
      .exec({}, (err, user) => {
        if (err) { 
          console.log('pasaif')
          res.status(500).send({message: `Error al borrar el producto: ${err}`}) 
        } else {
          console.log('pasaelse')
          console.log(user)
          res.status(200).send({

            usuario: user
          })
        }
      })
    })
      
   })
  app.get('/permisos/:_id', async (req, res) => {
      console.log('pasa permisos')
      const token = req.headers.authorization.split(' ')[1]
      console.log(token)
      Login.decodeTokenPer(token)
      .then(response => {
      Usuario.findById(response.sub)
      .exec({}, (err, user) => {
        if (err) { 
          console.log('pasaif')
          res.status(500).send({message: `Error al borrar el producto: ${err}`}) 
        } else {
          console.log('pasaelse')
          console.log(user)
          res.status(200).send({

            usuario: user
          })
        }
      })
    })
      
   })
  app.post("/", async (req, res) => {
    console.log('pasa')
    try {
    	console.log('pasa por ')
      let q = req.body;
      const data = await Usuario.create(q);
      res.status(201).json(data);
    } catch (error) {
    	console.log('pasa1')
      res.status(500).json({
        message: 'An error ocurred',
        error: error.toString()
      });
    }
  });
  
  //app.put('/adm', upload.single('image'), Auth.permisos(['Administrador de ADS'],'Modificar'), async (req, res) =>
  app.put("/", async (req, res) => {
    try {
      let q = req.body;
      const data = await Usuario.update(q);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: 'An error ocurred',
        error: error.toString()
      });
    }
  });

  app.delete("/:id", /* Auth.isUsuario, */ async (req, res) => {
    try {
      const data = await Usuario.delete(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        message: 'An error ocurred',
        error: error.toString()
      });
    }
  });
  
  export default app;


