const { validar } = require('../helpers/jwtFunctions')
const Usuario = require('../models/user')

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try{
        const { uid } = validar(token)
        const usuario = await Usuario.findOne({
            _id: uid,
            delete: false
        })
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no existe'
            })
        }
        req.usuario = usuario
        next()
    }catch(err) {
        console.log(err)
        res.status(400).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validateJWT
}