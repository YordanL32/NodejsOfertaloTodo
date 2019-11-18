import { Usuario} from "../models";
import {Login} from "../services"


export default {
  singIn: async (data) => {
    const user = await Usuario.findOne({email:data.email, password:data.password })
    if (!user){
      return {message:"Usuario o contraseña incorrecta", status:"denied"}
    }else{
    return {message: "has iniciado sesion con éxito", token: Login.createToken(user), usuario:user, status:"Success"}
    }
  }
};
