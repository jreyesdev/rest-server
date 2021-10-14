const { check } = require('express-validator')

const { retornoMid } = require('./index')
const { validateJWT } = require('./jwtValidate')
const { 
    existsIdCat, 
    existsProductName, 
    existsProductId } = require('../helpers/dbValidator')
const { sameRole } = require('./roleValidate')

const PostProduct = retornoMid([
    validateJWT,
    check('name','El nombre es requerido').not().isEmpty(),
    check('stock','Cantidad debe ser numérico').isInt(),
    check('price','Precio debe ser numérico').isNumeric(),
    check('category').custom(existsIdCat),
    check('name').custom(existsProductName)
])
const GetProductById = retornoMid([ check('id').custom(existsProductId) ])

const PutProductById = retornoMid([ 
    validateJWT,
    check('id').custom(existsProductId),
    check('name','El nombre es requerido').not().isEmpty(),
    check('stock','Cantidad debe ser numérico').isInt(),
    check('price','Precio debe ser numérico').isNumeric(),
    check('category').custom(existsIdCat)
])

const DelProductById = retornoMid([
    validateJWT,
    sameRole('SUPER_ADMIN','ADMIN'),
    check('id').custom(existsProductId)
])

module.exports = {
    PostProduct,
    GetProductById,
    PutProductById,
    DelProductById
}