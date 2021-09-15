const bcrypt = require('bcryptjs')

const Controller = require('./controller')
const Usuario = require('../models/user')

class UserController extends Controller{
    constructor(){
        super()
    }

    async getUsers(req = this.req, res = this.res){
        /*res.json({
            total: 2,
            page: 1,
            perPage: 10,
            totalPages: 1,
            nextPage: null,
            prevPage: null,
            data: [
                {
                    id: 1,
                    name: 'John Doe',
                    age: 33,
                },
                {
                    id: 2,
                    name: 'Paul Smith',
                    age: 28,
                }
            ]
        })*/
        const { limite = 5, desde = 0, page = 1 } = req.query

        // const total = await Usuario.countDocuments({ delete: true })
        // const users = await Usuario.find({ delete: true })
            // .skip(Number(desde))
            // .limit(Number(limite))
        const [ total, users ] = await Promise.all([
            Usuario.countDocuments({ delete: true }),
            Usuario.find({ delete: true })
                .skip(Number(desde))
                .limit(Number(limite))
        ])
        res.json({
            limit: limite,
            skip: desde,
            total,
            users
        })
    }

    getUserById(req = this.req, res = this.res){
        const { id } = req.params
        res.json({
            id,
            name: 'Lauren Cohan',
            age: 30,
        })
    }

    async postUser(req = this.req, res = this.res){
        const { name, email, password, image, role, google } = req.body
        const usuario = new Usuario({
            name, email, password, image, role, google
        })
        // Encrypta contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(usuario.password,salt)
        await usuario.save()
        res.json({
            message: 'Registered user successfully',
            usuario
        })
    }

    async putUser(req = this.req, res = this.res){
        const {id} = req.params
        const {password, google, email, ...resto} = req.body
        if(password){
            const salt = bcrypt.genSaltSync()
            resto.password = bcrypt.hashSync(password,salt)
        }
        const usuario = await Usuario.findByIdAndUpdate(id,resto)
        res.json({
            msg: 'Updated user successfully',
            usuario
        })
    }
}

module.exports = new UserController()