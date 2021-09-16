const bcrypt = require('bcryptjs')

const Controller = require('./controller')
const Usuario = require('../models/user')
const { generar } = require('../helpers/jwtFunctions')

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
                    token: await generar(user.uid)
                }
            res.status(msg ? 400 : 200).json(msg)
        }catch(err){
            console.log(err)
            res.status(500).json({
                mgs: "Error, contacte al administrador"
            })
        }
    }
}

module.exports = new AuthController()