const { isValidObjectId } = require("mongoose")

const { Categoria, Producto, Usuario } = require('../models')

const collects = [
    'category',
    'products',
    'users'
]

const categorias = async (cat = '') => {
    let res
    if(isValidObjectId(cat)){
        res = await Categoria.findById(cat)
    }else{
        const regexp = new RegExp(cat,'i')
        res = await Categoria.find({
            name: regexp,
            deleted: null
        })
    }
    return res ? res : []    
}

const productos = async (prod = '') => {
    let res
    if(isValidObjectId(prod)){
        res = await Producto.findById(prod)
    }else{
        const regexp = new RegExp(prod,'i')
        res = await Producto.find({
            name: regexp,
            deleted: null
        }).populate('category','name')
    }
    return res ? res : [] 
}

const usuarios = async (user = '') => {
    let res
    if(isValidObjectId(user)){
        res = await Usuario.findById(user)
    }else{
        const regexp = new RegExp(user,'i')
        res = await Usuario.find({
            $or: [
                { name: regexp },
                { email: regexp }
            ],
            delete: false
        })
    }
    return res ? res : []
}

class SearchController{
    help(req, res){
        return res.json({
            searchs_links: {
                categories: req.baseUrl+'/category/{any}',
                products: req.baseUrl+'/products/{any}',
                users: req.baseUrl+'/users/{any}'
            },
            collections: collects
        })
    }
    async buscar(req, res){
        const { coll, ter } = req.params
        if(!collects.includes(coll)){
            return res.status(400).json({
                msg: `Las colecciones permitidas son: ${collects.join(', ')}`
            })
        }
        let results
        switch(coll){
            case 'category':
                results = await categorias(ter)
                break
            case 'products':
                results = await productos(ter)
                break
            case 'users':
                results = await usuarios(ter)
                break
            default:
                return res.status(500).json({
                    msg: 'Buscando... Error....'
                })
        }
        return res.json({
            search: `${coll}/${ter}`,
            count_result: results.length,
            results
        })
    }
}

module.exports = new SearchController()