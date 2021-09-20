const { Router } = require('express')
const router = Router()

const { 
    addProduct,
    getProduct, 
    getProducts,
    updateProduct,
} = require('../controllers/productController')

const { 
    GetProductById,
    PostProduct,
    PutProductById, 
} = require('../middlewares/productMiddleware')

// Middleware para todas las rutas
router.use((req,res,next)=>{
    console.log('Consulta ruta producto: ' + new Date(Date.now()))
    next()
})

// Todos los productos
router.get('',getProducts)
// Crea un porducto
router.post('',PostProduct,addProduct)
// Muestra un producto por id
router.get('/:id',GetProductById,getProduct)
// Actualiza producto por id
router.put('/:id',PutProductById,updateProduct)
/*
// Elimina un producto por id
router.delete('/:id',)
*/
module.exports = router