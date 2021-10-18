const { check } = require('express-validator')

const { retornoMid } = require('./index')
const { validateJWT } = require('./jwtValidate')

const { allowedCollec } = require('../helpers/subirArchivo')
const { existsCollectId } = require('../helpers/dbValidator')

const PutImage = retornoMid([
    check('id','El id debe ser id de mongo').isMongoId(),
    check('col').custom(allowedCollec),
    check('col').custom(existsCollectId)
])

module.exports = {
    PutImage
}