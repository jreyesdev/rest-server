const { Producto } = require('../models')

class ProductController{
    async getProducts(req, res){
        const { limite = 5, desde = 0, page = 1 } = req.query
        const [ total, prods ] = await Promise.all([
            Producto.countDocuments({ deleted: null }),
            Producto.find({ deleted: null })
                .populate('category','name')
                .populate('created_by','name')
                .populate('updated_by','name')
                .skip(Number(desde))
                .limit(Number(limite))
        ])
        res.json({
            limit: limite,
            skip: desde,
            total,
            prods
        })
    }
    async addProduct(req, res){
        const { 
            name, stock, price, 
            category, description = null } = req.body
        try{
            const prod = new Producto({
                name, stock, price, description, category,
                created_by: req.usuario._id
            })
            await prod.save()
            res.json({
                msg: 'Registered product successfully',
                product: prod
            })
        }catch(e){
            console.log(e)
            res.status(500).json({
                msg: 'Error al crear producto'
            })
        }
    }
    async getProduct(req, res){
        const { id } = req.params
        try{
            const product = await Producto.findById({ _id: id, deleted: null })
                .populate('category','name')
                .populate('created_by','name')
                .populate('updated_by','name')

            res.json({ product })
        }catch(e){
            console.log(e)
            res.status(500).json({
                msg: 'Error al consultar producto'
            })
        }
    }
    async updateProduct(req, res){
        const { name, stock, price, description, category } = req.body
        const { id } = req.params
        try{
            const prod = await Producto.findOne({ name, category, deleted: null })
            if(prod && prod._id.toString() !== id){
                return res.status(400).json({
                    msg: `EL producto ya existe en la categoria`
                })
            }
            const data = {
                name, stock, price, description, category,
                updated: Date.now(),
                updated_by: req.usuario._id
            }
            const product = await Producto.findByIdAndUpdate(id,data,{ new: true})
                .populate('category','name')
                .populate('created_by','name')
                .populate('updated_by','name')
            res.json({
                msg: 'Updated product successfully',
                product
            })
        }catch(e){
            console.log(e)
            res.status(500).json({
                msg: 'Error al actualizar producto'
            })
        }
    }
    async deleteProduct(req, res){
        const { id } = req.params
        try{
            const data = {
                updated: Date.now(),
                updated_by: req.usuario._id,
                deleted: Date.now()
            }
            const product = await Producto.findByIdAndUpdate(id,data)
                .populate('category','name')
                .populate('created_by','name')
                .populate('updated_by','name')
            res.json({
                msg: 'Deleted product successfully',
                product
            })
        }catch(e){
            console.log(e)
            res.status(500).json({
                msg: 'Error al eliminar producto'
            })
        }
    }
}

module.exports = new ProductController()