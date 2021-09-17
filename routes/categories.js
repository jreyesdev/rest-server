const { Router } = require('express')
const router = Router()

const { create, getById } = require('../controllers/categoryController')
const { PostCategory, GetCategoryId } = require('../middlewares/categoryMiddleware')

// Todas las categorias
router.get('/',[
    validarCampos
],)

// Crea categoria
router.post('/',PostCategory,create)

// Obtiene una categoria por id
router.get('/:id',GetCategoryId,getById)

// Actualiza categoria
router.put('/:id',[
    validarCampos
],)

// Elimina categoria
router.delete('/:id',[
    validarCampos
],)

module.exports = router