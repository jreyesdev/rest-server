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

}

module.exports = new ProductController()