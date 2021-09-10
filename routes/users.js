const { Router } = require('express')
const router = Router()

const { getUsers, postUser } = require('../controllers/userController')

router.get('',getUsers)

router.post('',postUser)

module.exports = router