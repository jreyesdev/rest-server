const { Router } = require('express')
const router = Router()

const { PutImage, PostArchivo } = require('../middlewares/uploadMiddleware')

const { cargarArchivo, putImg } = require('../controllers/uploadController')

router.post('', PostArchivo, cargarArchivo)

router.put('/:col/:id', PutImage, putImg)

module.exports = router