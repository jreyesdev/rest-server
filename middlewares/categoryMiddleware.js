const { check } = require('express-validator')

const { retornoMid } = require('./index')
const { validateJWT } = require('./jwtValidate')
const { existsIdCat } = require('../helpers/dbValidator')
const { sameRole } = require('./roleValidate')

const PostCategory = retornoMid([
    validateJWT,
    check('name','Nombre es requerido').not().isEmpty()
])

const GetCategoryId = retornoMid([
    check('id').custom(existsIdCat)
])

const PutCategoryId = retornoMid([
    validateJWT,
    check('name','El nombre es requerido').not().isEmpty(),
    check('id').custom(existsIdCat)
])

const DelCategoryId = retornoMid([
    validateJWT,
    sameRole('SUPER_ADMIN','ADMIN'),
    check('id').custom(existsIdCat)
])

module.exports = {
    PostCategory,
    GetCategoryId,
    PutCategoryId,
    DelCategoryId
}
