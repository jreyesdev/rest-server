const { Router } = require('express')
const router = Router()

const { cargarArchivo, putImg } = require('../controllers/uploadController')

router.post('', cargarArchivo)

router.put(':col/:id', putImg)

module.exports = router