const express = require(`express`);
const router = express.Router();
const bcrypt = require(`bcryptjs`);

const User = require (`../models/User`);

const passport = require(`passport`);
//inicio de sesion
router.get(`/signin`, (req, res) => {
 res.render(`users/login`);
});
 // se hizo en passport LocalStrategy
router.post(`/signin`, passport.authenticate(`local`, {
    successRedirect: `/publicaciones`,
    failureRedirect: `/signin`,
    failureFlash: true
}));
//registro
router.get(`/signup`, (req, res) => {
res.render(`users/registro`);
});

router.post(`/signup`, async (req, res) => {
   const { name, email, password, confirm_password } = req.body;
  const errors = [];
  /* ---------------------validaciones del registro ------------------------ */
  if(name.length <= 0) {
      errors.push({text: `Por favor introducir tu nombre`});
  }
  if(password.length <= 0) {
   errors.push({text: `por favor introducir password`});
}
if(confirm_password.length <= 0) {
    errors.push({text: `por favor confirmar la contraseña`});
}
  
  if(password != confirm_password) {
      errors.push({text: `password no coincide`});
   }
   if(password.length < 4) {
       errors.push({text: `password mayor a 4 caracteres`});

   }
   if(errors.length > 0){
       res.render(`users/registro`, {errors, name, email, password, confirm_password});
   } else {

   const emailUser = await User.findOne({email: email});
   if(emailUser) {
      req.flash(`error_msg`, `El email ya esta en uso`);
       res.redirect(`/users/registro`);
   } 
  /*  ----------------------------------------------------- */
   const newUser = new User ({name, email, password});    
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save(); //guarda un usuario
    req.flash(`success_msg`, `Bienvenido ya estas registrado`);
    res.redirect(`signin`);
}

  
 

});

router.get(`/users/logout`, (req, res) => {
    req.logout();
    res.redirect(`/`);
});

module.exports = router;
