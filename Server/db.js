const { connect } = require('mongoose')

const CONNECTION_STRING_URI = process.env.CONNECTION_STRING_URI || 'mongodb://localhost:27017/dontchat'

const db = connect(CONNECTION_STRING_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoBD connected...')
    })
    .catch(err => {
        console.error('Faild to connect with MongoDB')
        throw new Error(err)
    })

module.exports = db
