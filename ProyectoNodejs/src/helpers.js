const moment = require('moment'); //dependencia para el tiempo de publicacion
const helpers = {};

helpers.tiempoAtras = Create_at => {
    return moment(Create_at).startOf('minute').fromNow();
 
};

module.exports = helpers;
