const { Categoria, Role, Usuario } = require('../models')

class DBValidator{
    async isValidRol(rol=''){
        const role = await Role.findOne({ rol })
        if(!role){
            throw new Error(`El rol ${role} no existe`)
        }
    }

    async emailExists(email=''){
        const correo = await Usuario.findOne({ email })
        if(!correo){
            throw new Error(`El correo ${correo} ya existe`)
        }
    }

    async existsIdUser(id=''){
        const user = await Usuario.findById({ id })
        if(!user){
            throw new Error(`El id ${id} no es válido`)
        }
    }

    async existsIdCat(id=''){
        const cat = await Categoria.findById({ id })
        if(!cat){
            throw new Error(`El id ${id} no es válido`)
        }
    }
}

module.exports = new DBValidator()