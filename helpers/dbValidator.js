const Rol = require('../models/rol')
const Usuario = require('../models/user')

const isValidRol = async (rol='') => {
    const role = await Rol.findOne({ rol })
    if(!role){
        throw new Error(`El rol ${role} no existe`)
    }
}

const emailExists = async (email = '') => {
    const correo = await Usuario.findOne({ email })
    if(!correo){
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const existsIdUser = async (id = '') => {
    const user = await Usuario.findById({ id })
    if(!user){
        throw new Error(`El id ${id} no es válido`)
    }
}

module.exports = {
    isValidRol,
    emailExists,
    existsIdUser
}