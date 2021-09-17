const Controller = require('./controller')
const { Categoria } = require('../models')

class CategoryController extends Controller{
    constructor(){
        super()
    }
    async create(req = this.req, res = this.res){
        const name = req.body.name.toUpperCase()
        const categoria = await Categoria.findOne({ name })
        if(categoria){
            return res.status(400).json({
                msg: `La categoria ${categoria.name} ya existe`
            })
        }
        try {
            const newCat = new Categoria({
                name,
                created_by: req.usuario.uid
            })
            await newCat.save();
            res.json({
                msg: 'Registered category successfully',
                categoria: newCat
            })
        }catch(err){
            console.log(err)
            res.status(500).json({
                msg: 'Error al crear categoria'
            })
        }
    }

    async getAll(req = this.req, res = this.res){}
}

module.exports = new CategoryController()