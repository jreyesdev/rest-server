const { check } = require('express-validator')

const Middleware = require('./index')
const { validateJWT } = require('./jwtValidate')
const { existsIdCat, existsProductName } = require('../helpers/dbValidator')
const { sameRole } = require('./roleValidate')

class ProductMiddleware extends Middleware{
    constructor(){
        super()
    }
    PostProduct(){
        this.resp = [
            validateJWT,
            check('name','El nombre es requerido').not().isEmpty(),
            check('stock','Cantidad debe ser numérico').isInt(),
            check('price','Precio debe ser numérico').isNumeric(),
            check('category').custom(existsIdCat),
            check('name').custom(existsProductName)
        ]
        this.retornoMid()
    }
}

module.exports = new ProductMiddleware()