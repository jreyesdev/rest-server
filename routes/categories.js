const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { validarCampos } = require('../middlewares/fieldsValidate')
const { validateJWT } = require('../middlewares/jwtValidate')
const { create } = require('../controllers/categoryController')

// Todas las categorias
router.get('/',[
    validarCampos
],)

// Crea categoria
router.post('/',[
    validateJWT,
    check('name','Nombre es requerido').not().isEmpty(),
    validarCampos
],create)

// Obtiene una categoria por id
router.get('/:id',[
    validarCampos
],)

// Actualiza categoria
router.put('/:id',[
    validarCampos
],)

// Elimina categoria
router.delete('/:id',[
    validarCampos
],)

module.exports = router