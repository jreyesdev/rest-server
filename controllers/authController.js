const bcrypt = require('bcryptjs')

const Controller = require('./controller')
const Usuario = require('../models/user')
const { generar } = require('../helpers/jwtFunctions')
const { googleVerify } = require('../helpers/googleVerify')

class AuthController extends Controller{
    constructor(){
        super()
    }
    async login(req = this.req, res = this.res){
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
            res.status(msg ? 400 : 200).json(msg)
        }catch(err){
            console.log(err)
            res.status(500).json({
                mgs: "Error, contacte al administrador"
            })
        }
    }

    async googleSingIn(req = this.req, res = this.res){
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
            const token = await generar(usuario.uid)            
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
}

module.exports = new AuthController()