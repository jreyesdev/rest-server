const { Router } = require('express')
const router = Router()

const { PutImage, PostArchivo, GetImage } = require('../middlewares/uploadMiddleware')

const { cargarArchivo, putImg, getImg } = require('../controllers/uploadController')

router.post('', PostArchivo, cargarArchivo)

router.get('/:col/:id', GetImage, getImg)

router.put('/:col/:id', PutImage, putImg)

module.exports = router