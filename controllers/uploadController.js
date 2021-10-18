const { deleteFile, subirArchivo } = require("../helpers/subirArchivo");
const { Producto, Usuario } = require("../models");

class UploadController {
  async cargarArchivo(req, res) {
    try{
        const extPermitidas = ["png", "jpg", "jpeg", "gif"]
        const fileName = await subirArchivo(req.files,extPermitidas)
        res.json({
            msg: 'File upload successfully',
            fileName
        })    
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
  }
  async putImg(req, res){
    const { col, id } = req.params
    let fileName, directory, model
    const extPermitidas = ["png", "jpg", "jpeg", "gif"],
        dirs = {
            users: 'avatar/',
            products: 'products/'
        }

    directory = dirs[col]

    if(!directory) res.status(500).json({ msg: 'Error directorio' })

    try{
        fileName = await subirArchivo(req.files,extPermitidas,directory)   
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }

    switch(col){
        case 'users':
            model = await Usuario.findById({ _id: id})
            break
        case 'products':
            model = await Producto.findById({ _id: id })
            model.updated = Date.now()
            model.updated_by = req.usuario._id
            break
    }

    try{
        if(model.image) await deleteFile(model.image)
        model.image = directory + fileName
        await model.save()
        res.json({
            msg: 'Updated image',
            fileName
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ msg: 'Error...', err })
    }
  }
}

module.exports = new UploadController()
