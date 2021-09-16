const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { validarCampos } = require('../middlewares/fieldsValidate')
const { login } = require('../controllers/authController')

router.post('/login',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)

module.exports = router