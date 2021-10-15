const { Router } = require('express')
const router = Router()

const { buscar, help } = require('../controllers/searchController')

// Middleware para todas las rutas
router.use((req,res,next)=>{
    console.log('Consulta ruta de busqueda: ' + new Date(Date.now()))
    next()
})

// Help
router.get('',help)

// collection/termino
router.get('/:coll/:ter',buscar)

module.exports = router