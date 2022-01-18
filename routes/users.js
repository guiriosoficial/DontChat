const router = require("express").Router()

const UsersController = require('../controllers/users')

router.post('/:socketId', UsersController.setUser)
router.patch('/:socketId', UsersController.updateUser)


module.exports = router
