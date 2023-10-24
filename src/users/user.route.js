const express = require('express')
const router = express.Router()
const controller = require('./user.controller')

router.get('/api/v1/users', controller.getUser)
router.get('/api/v1/users/:userId', controller.getUserById)

module.exports = router
