const { Categoria} = require('../models');
const ctrl = {}

ctrl.findById=async(req, res) =>{ 
  try{
    const categorias = await Categoria.findById(req.params.id);//buscar por id     
    res.json(categorias);
  }catch (error) {
    console.log('error en al buscar Un elemento')
  }      
}
ctrl.find =async(req, res) =>{ 
  try{
     const categorias=await Categoria.find().sort({Create_at:'desc'})    
    res.json(categorias)
  }catch (error) {
    console.log('error en al obtener metodo Get')
    }
  }
  ctrl.create =async(req, res) =>{
    try {
      const newCategoria = new Categoria(req.body)
     await newCategoria.save()
     res.json(newCategoria)
    } catch (error) {
      console.log('error en al guardar metodo Create')
    }   
  };
  ctrl.update=async(req, res) =>{ 
    try{
      const{nombre} = req.body
      const categorias = await Categoria.findByIdAndUpdate(req.params.id, {nombre});
    res.json(categorias);
    }catch (error) {
      console.log('error en al actualizar metodo Update')
    }      
  }
  ctrl.delete = async(req, res)=> {
    try{
      const categorias = await Categoria.findByIdAndDelete(req.params.id);   
      res.json(categorias)
    }catch (error) {
      console.log('error en al eliminar metodo delete')
    }
    }
  module.exports = ctrl;