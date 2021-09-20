const { Router } = require('express')
const router = Router()

const { getProducts } = require('../controllers/productController')

// Middleware para todas las rutas
router.use((req,res,next)=>{
    console.log('Consulta ruta producto: ' + new Date(Date.now()))
    next()
})

// Todos los productos
router.get('',getProducts)
/*
// Crea un porducto
router.post('',)
// Muestra un producto por id
router.get('/:id',)
// Actualiza producto por id
router.put('/:id',)
// Elimina un producto por id
router.delete('/:id',)
*/
module.exports = router