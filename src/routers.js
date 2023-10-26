const express = require('express')
const router = express.Router()

const userController = require('./users/user.route')

// middleware
router.use(express.json())
router.use(express.urlencoded({extended: true}))

// controller
router.use(userController)

// Unknown URL
router.use('*', (_, res) => res.status(404).send('Unknown URL'))

module.exports = router
