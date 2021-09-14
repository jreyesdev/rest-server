const Rol = require('../models/rol')

const isValidRol = async (rol='')=>{
    const rol = await Rol.findOne({ rol })
    if(!rol){
        throw new Error(`El rol ${rol} no existe`)
    }
}

module.exports = {
    isValidRol
}