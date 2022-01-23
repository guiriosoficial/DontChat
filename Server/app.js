const express = require('express')
const cors =  require('cors')

const app = express()
app.set('etag', false)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

module.exports = app
