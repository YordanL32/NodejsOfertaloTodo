'use strict'
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

import Debug from 'debug'


const debug = new Debug('email:server:api:Login')

export default {
    createToken: (user) => {
    debug(`Finding login for createToken.`)
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
  },
  decodeTokenPer: (token, res) => {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if (payload.exp <= moment().unix()) {
                res.status(200).send({ message: `El token a expirado`, status: 'denied', redirect: '/login.html' })
            }
            resolve(payload)
        } catch (err) {
            return res.status(401).send({ message: `Token Invalido`, status: 'denied', redirect: '/login.html' })
        }
    })

    return decoded
},
  decodeTok: (token,res) => {
    const decoded = new Promise((resolve, reject) => {
      try {
          const payload = jwt.decode(token, config.SECRET_TOKEN)
          if (payload.exp <= moment().unix()) {
              res.status(200).send({ message: `El token a expirado`, status: 'denied', redirect: '/login.html' })
          }
          resolve(payload)
      } catch (err) {
          return res.status(401).send({ message: `Token Invalido`, status: 'denied', redirect: '/login.html' })
      }
  })
  return decoded
  }
  
}