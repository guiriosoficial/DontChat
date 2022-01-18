const router = require("express").Router()

const MessagesController = require('../controllers/messages')

router.get('/', MessagesController.getMessages)

module.exports = router
