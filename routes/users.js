const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { getUsers, postUser, getUserById, putUser, deleteUser } = require('../controllers/userController')
const { validarCampos } = require('../middlewares/fieldsValidate')
const { isValidRol, emailExists, existsIdUser } = require('../helpers/dbValidator')

router.get('',getUsers)

router.get('/:id',[
    check('id').custom(existsIdUser),
    check('role').custom(isValidRol),
    validarCampos
],getUserById)

router.post('',[
    check('name','El nombre es requerido').not().isEmpty(),
    check('email').custom(emailExists),
    check('password','La contraseña debe ser mayor o igual a 6 caracteres').isLength({min: 6}),
    //check('role','No es un rol válido').isIn(['SUPER_ADMIN','ADMIN','USER']),
    check('role').custom(isValidRol),
    validarCampos
],postUser)

router.put('/:id',putUser)

router.delete('/:id',[
    check('id','El ID no es válido').isMongoId(),
    check('id').custom(existsIdUser),
    validarCampos
],deleteUser)

module.exports = router