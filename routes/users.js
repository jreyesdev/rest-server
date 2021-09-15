const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { getUsers, postUser, getUserById, putUser } = require('../controllers/userController')
const { formRegister } = require('../middlewares/userRegister')
const { isValidRol, emailExists, existsIdUser } = require('../helpers/dbValidator')

router.get('',getUsers)

router.get('/:id',[
    check('id').custom(existsIdUser),
    check('role').custom(isValidRol),
    formRegister
],getUserById)

router.post('',[
    check('name','El nombre es requerido').not().isEmpty(),
    check('email').custom(emailExists),
    check('password','La contraseña debe ser mayor o igual a 6 caracteres').isLength({min: 6}),
    //check('role','No es un rol válido').isIn(['SUPER_ADMIN','ADMIN','USER']),
    check('role').custom(isValidRol),
    formRegister
],postUser)

router.put('/:id',putUser)

module.exports = router