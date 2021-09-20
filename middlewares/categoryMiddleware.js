const { check } = require('express-validator')

const Middleware = require('./index')
const { validateJWT } = require('./jwtValidate')
const { existsIdCat } = require('../helpers/dbValidator')
const { sameRole } = require('./roleValidate')

class CategoryMiddleware extends Middleware{
    constructor(){
        super()
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
            check('name','El nombre es requerido').not().isEmpty(),
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
}

module.exports = new CategoryMiddleware()