const { Router } = require('express')
const router = Router()

const { getUsers, postUser, getUserById } = require('../controllers/userController')

router.get('',getUsers)

router.get('/:id',getUserById)

router.post('',postUser)

module.exports = router