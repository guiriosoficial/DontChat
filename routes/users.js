const router = require("express").Router()

const UsersController = require('../controllers/users')

router.post('/:socketId', UsersController.createUser)
router.patch('/:socketId', UsersController.updateUser)


module.exports = router
