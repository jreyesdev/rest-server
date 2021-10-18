const { Router } = require('express')
const router = Router()

const { PutImage } = require('../middlewares/uploadMiddleware')

const { cargarArchivo, putImg } = require('../controllers/uploadController')

router.post('', cargarArchivo)

router.put('/:col/:id', PutImage, putImg)

module.exports = router