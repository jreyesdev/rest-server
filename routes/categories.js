const { Router } = require('express')
const router = Router()

const { 
    create, 
    getById, 
    getAll, 
    updateId, 
    deleteId } = require('../controllers/categoryController')

const { 
    PostCategory, 
    GetCategoryId, 
    PutCategoryId, 
    DelCategoryId} = require('../middlewares/categoryMiddleware')

// Todas las categorias
router.get('/',getAll)

// Crea categoria
router.post('/',PostCategory,create)

// Obtiene una categoria por id
router.get('/:id',GetCategoryId,getById)

// Actualiza categoria
router.put('/:id',PutCategoryId,updateId)

// Elimina categoria
router.delete('/:id',DelCategoryId,deleteId)

module.exports = router