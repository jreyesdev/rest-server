const { check } = require('express-validator')

const { validarCampos } = require('./fieldsValidate')
const { validateJWT } = require('./jwtValidate')
const { existsIdCat } = require('../helpers/dbValidator')
const { sameRole } = require('./roleValidate')

class CategoryMiddleware{
    constructor(){
        this.resp = []
    }
    GetCategories(){
        return this.retornoMid()
    }
    PostCategory(){
        this.resp = [
            validateJWT,
            check('name','Nombre es requerido').not().isEmpty()
        ]
        return this.retornoMid()
    }
    GetCategoryId(){
        this.resp = [
            check('id').custom(existsIdCat)
        ]
        return this.retornoMid()
    }
    PutCategoryId(){
        this.resp = [
            validateJWT,
            check('id').custom(existsIdCat)
        ]
        return this.retornoMid()
    }
    DelCategoryId(){
        this.resp = [
            validateJWT,
            sameRole('SUPER_ADMIN','ADMIN'),
            check('id').custom(existsIdCat)
        ]
        return this.retornoMid()
    }
    retornoMid(){
        return this.resp.push(validarCampos)
    }
}

module.exports = new CategoryMiddleware()