const router = require("express").Router()

const UsersController = require('../controllers/users')

router.put('/:socketId', UsersController.handleUser)

module.exports = router
