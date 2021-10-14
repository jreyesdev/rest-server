const { Categoria } = require('../models')

class CategoryController{
    async create(req, res){
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
                created_by: req.usuario._id
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

    async getAll(req, res){
        const { limite = 5, desde = 0, page = 1 } = req.query
        const [ total, cats ] = await Promise.all([
            Categoria.countDocuments({ deleted: null }),
            Categoria.find({ deleted: null })
                .populate('created_by','name')
                .populate('updated_by','name')
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

    async getById(req, res){
        const { id } = req.params
        try{
            const categoria = await Categoria.findOne({
                _id: id,
                deleted: null
            })
            .populate('created_by','name')
            .populate('updated_by','name')

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
    
    async updateId(req, res){
        const { id } = req.params
        const name = req.body.name.toUpperCase()
        try{
            const cat = await Categoria.findOne({ name })
            if(cat && cat._id.toString() !== id){
                return res.status(400).json({
                    msg: `El nombre de categoria ${name} ya existe`
                })
            }
            const data = {
                name,
                updated: Date.now(),
                updated_by: req.usuario._id,
            }
            const upCat = await Categoria.findByIdAndUpdate(id,data,{ new: true })
                .populate('created_by','name')
                .populate('updated_by','name')
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

    async deleteId(req, res){
        const { id } = req.params
        try{
            const data = {
                updated: Date.now(),
                updated_by: req.usuario._id,
                deleted: Date.now()
            }
            const categoria = await Categoria.findByIdAndUpdate(id,data,{new: true})
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