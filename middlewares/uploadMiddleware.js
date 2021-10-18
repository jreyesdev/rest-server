const { check } = require('express-validator')

const { retornoMid } = require('./index')
const { validateJWT } = require('./jwtValidate')

const { allowedCollec, validarArchivo } = require('../helpers/subirArchivo')
const { existsCollectId } = require('../helpers/dbValidator')

const PostArchivo = retornoMid([
    validarArchivo
])

const GetImage = retornoMid([
    check('id','El id debe ser id de mongo').isMongoId(),
    check('col').custom(allowedCollec),
    check('col').custom(existsCollectId),
])

const PutImage = retornoMid([
    validateJWT,
    validarArchivo,
    check('id','El id debe ser id de mongo').isMongoId(),
    check('col').custom(allowedCollec),
    check('col').custom(existsCollectId),
])

module.exports = {
    GetImage,
    PostArchivo,
    PutImage
}