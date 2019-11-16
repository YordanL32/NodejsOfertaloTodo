'use strict'
import { Login } from '../services'

function AuthToken(req, res, next) {
    if(req.path != '/api/login'){
        if (req.headers.authorization) {
           const token = req.headers.authorization.split(' ')[1]
          Login.decodeTok(token, res)
        .then(response => {
                req.user = response
                next()
        })
        .catch(response => {
            res.status(response.status)
        })
            }else{
               return res.status(403).send({status:'denied', message: 'No tienes autorización is Auth' })
            }

        }else{
           next();
       }
}
function isUsuario(req, res, next) {
  if(req.path != '/api/login'){
    if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    Login.decodeTok(token, res)
        .then(response => {
            if(response.rol== 'Administrador' )
            {
                req.user = response
                next()
            }
            else{
                return res.status(403).send({status:'denied', rol:response.rol, message: 'Nooo tienes autorización' })
            }
        })
        .catch(response => {
            res.status(response.status)
        })
     }else{
      return res.status(403).send({status:'denied', message: 'No tienes autorización' })
    }
    }else{
           next();
       }
}

module.exports={
    AuthToken, isUsuario
}