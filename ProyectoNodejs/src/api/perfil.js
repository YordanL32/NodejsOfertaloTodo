const { Perfil} = require('../models');
const ctrl = {}

ctrl.findById=async(req, res) =>{ 
  try{
    const perfiles= await Perfil.findById(req.params.id);//buscar por id     
    res.json(perfiles);
  }catch (error) {
    console.log('error en al buscar Un elemento')
  }      
}
ctrl.find =async(req, res) =>{ 
  try{
     const perfiles=await Perfil.find().sort({Create_at:'desc'})    
    res.json(perfiles)
  }catch (error) {
    console.log('error en al obtener metodo Get')
    }
  }
  ctrl.create =async(req, res) =>{
    try {
      const newPerfil = new Perfil(req.body)
     await newPerfil.save()
     res.json(newPerfil)
    } catch (error) {
      console.log(error)
      console.log('error en al guardar metodo Create')
    }   
  };
  ctrl.update=async(req, res) =>{
    try{
      const{sexo} = req.body
      const{fecha_nacimiento} = req.body
      console.log(fecha_nacimiento);
      const perfiles = await Perfil.findByIdAndUpdate(req.params.id, {sexo, fecha_nacimiento});
    res.json(perfiles);
    }catch (error) {
      console.log(error)
      console.log('error en al actualizar metodo Update')
    }      
  }
  ctrl.delete = async(req, res)=> {
    try{
      const perfiles = await Perfil.findByIdAndDelete(req.params.id);   
      res.json(perfiles)
    }catch (error) {
      console.log('error en al eliminar metodo delete')
    }
    }
  module.exports = ctrl;