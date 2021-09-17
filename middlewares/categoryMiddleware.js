const { check } = require('express-validator')

const { validarCampos } = require('./fieldsValidate')
const { validateJWT } = require('./jwtValidate')
const { existsIdCat } = require('../helpers/dbValidator')

class CategoryMiddleware{
    PostCategory(){
        return [
            validateJWT,
            check('name','Nombre es requerido').not().isEmpty(),
            validarCampos
        ]
    }
    GetCategoryId(){
        return [
            check('id').custom(existsIdCat),
            validarCampos
        ]
    }
}

module.exports = new CategoryMiddleware()