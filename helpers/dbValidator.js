const { Categoria, Role, Usuario, Producto } = require('../models')

class DBValidator{
    async isValidRol(rol=''){
        const role = await Role.findOne({ rol })
        if(!role){
            throw new Error(`El rol ${rol} no existe`)
        }
    }
    async emailExists(email=''){
        const correo = await Usuario.findOne({ email })
        if(correo){
            throw new Error(`El correo ${correo.email} ya existe`)
        }
    }
    async existsIdUser(id=''){
        const user = await Usuario.findById({ _id: id })
        if(!user){
            throw new Error(`El id ${id} no es válido`)
        }
    }
    async existsIdCat(id=''){
        const cat = await Categoria.findById({ _id: id })
        if(!cat){
            throw new Error(`El id ${id} no es válido`)
        }
    }
    async existsProductName(name='',{ req }){
        const prod = await Producto.findOne({
            name,
            category: req.body.category
        })
        if(prod){
            throw new Error(`El producto ${name} ya existe en la categoria`)
        }
    }
    async existsProductId(id=''){
        const prod = await Producto.findById({ _id: id })
        if(!prod) throw new Error(`El id ${id} no es válido`)
    }
    async existsCollectId(col='',{ req }){
        const { id } = req.params
        let resp
        switch(col){
            case 'users':
                resp = await Usuario.findById({ _id: id })
                break
            case 'products':
                resp = await Producto.findById({ _id: id })
                break
            default:
                resp = null
                break
        }
        if(!resp){
            throw new Error(`El id ${id} no existe en la colección ${col}`)
        }
    }
}

module.exports = new DBValidator()