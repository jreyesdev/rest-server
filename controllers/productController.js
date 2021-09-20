const Controller = require('./controller')
const { Producto } = require('../models')

class ProductController extends Controller{
    constructor(){
        super()
    }
    async getProducts(req = this.req, res = this.res){
        const { limite = 5, desde = 0, page = 1 } = req.query
        const [ total, prods ] = await Promise.all([
            Producto.countDocuments({ deleted: null }),
            Producto.find({ deleted: null })
                .populate('usuario','name')
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
    async addProduct(req = this.req, res = this.res){
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
}

module.exports = new ProductController()