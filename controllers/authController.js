const bcrypt = require('bcryptjs')

const Usuario = require('../models/user')
const { generar } = require('../helpers/jwtFunctions')
const { googleVerify } = require('../helpers/googleVerify')

class AuthController{
    async login(req, res){
        const { email, password } = req.body
        try{
            let msg = false, failLogin = 'Email y password no son válidos'
            const user = await Usuario.findOne({ email })
            msg = (!user || user.delete) ? true : false
            msg = msg ? true :
                (bcrypt.compareSync(password,user.password) ? false : true)
            msg = msg ? { msg: failLogin }
                : {
                    user,
                    token: await generar(user._id)
                }
            res.status(msg.msg ? 400 : 200).json(msg)
        }catch(err){
            console.log(err)
            res.status(500).json({
                mgs: "Error, contacte al administrador"
            })
        }
    }

    async googleSingIn(req, res){
        const { id_token } = req.body
        try {
            const { email, name, image } = await googleVerify(id_token)
            let usuario = await Usuario.findOne({ email })
            if(!usuario){
                usuario = new Usuario({
                    name,
                    email,
                    password: '123456',
                    image,
                    google: true
                })
                await usuario.save()
            }
            if(usuario.delete){
                return res.status(401).json({
                    msg: 'Contacte al administrador'
                })
            }
            const token = await generar(usuario._id)            
            res.json({
                msg: 'Google singin successfully',
                user: googleUser,
                token
            })
        }catch(err){
            console.log(err)
            res.status(400).json({
                msg: 'Token Google no válido'
            })
        }
    }
    async renovarToken(req, res){
        const user = req.usuario
        const token = await generar(user._id)
        res.json({
            user,
            token
        })
    }
}

module.exports = new AuthController()