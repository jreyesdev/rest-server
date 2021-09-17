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

    async getAll(req = this.req, res = this.res){
        const { limite = 5, desde = 0, page = 1 } = req.query
        const [ total, cats ] = await Promise.all([
            Categoria.countDocuments({ delete: null }),
            Categoria.find({ delete: null })
                .skip(Number(desde))
                .limit(Number(limite))
        ])
        res.json({
            limit: limite,
            skip: desde,
            total,
            cats
        })
    }

    async getById(req = this.req, res = this.res){
        const { id } = req.params
        try{
            const categoria = await Categoria.findOne({
                id,
                delete: null
            })
            if(!categoria){
                return res.status(400).json({
                    msg: 'No existe categoria con id: ' + id
                })
            }
            res.json({ categoria })
        }catch(err){
            console.log(err)
            res.status(500).json({
                msg: 'Error al consultar categoria'
            })
        }
    }
    
    async updateId(req = this.req, res = this.res){
        const { id } = req.params
        const name = req.body.name.toUpperCase()
        try{
            const cat = await Categoria.findOne({ name })
            if(cat && cat.uid !== id){
                return res.status(400).json({
                    msg: `El nombre de categoria ${name} ya existe`
                })
            }
            const upCat = new Categoria({
                name,
                updated: Date.now(),
                updated_by: req.usuario._id
            })
            await upCat.save()
            res.json({
                msg: 'Updated category successfully',
                categoria: upCat
            })
        }catch(e){
            console.log(e)
            res.status(500).json({
                msg: 'Error al consultar categoria.'
            })
        }
    }

    async deleteId(req = this.req, res = this.res){
        const { id } = req.params
        try{
            const data = {
                updated: Date.now(),
                updated_by: req.usuario._id,
                delete: Date.now()
            }
            const categoria = await Categoria.findByIdAndUpdate(id,data)
            res.json({
                msg: 'Deleted category successfully',
                categoria
            })
        }catch(e){
            console.log(e)
            res.status(500).json({
                msg: 'Error al consultar categoria..'
            })
        }
    }
}

module.exports = new CategoryController()