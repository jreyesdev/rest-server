const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { validarCampos } = require('../middlewares/fieldsValidate')
const { login, googleSingIn, renovarToken } = require('../controllers/authController')
const { validateJWT } = require('../middlewares/jwtValidate')

router.get('', validateJWT, renovarToken)

router.post('/login',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login)

router.post('/google',[
    check('id_token','El id_token es necesario').not().isEmpty(),
    validarCampos
],googleSingIn)

module.exports = router