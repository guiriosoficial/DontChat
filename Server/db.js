const { connect } = require('mongoose')

const db = connect('mongodb://localhost:27017/dontchat')
    .then(() => {
        console.log('MongoBD connected...')
    })
    .catch(err => {
        console.error('Faild to connect with MongoDB')
        throw new Error(err)
    })

module.exports = db
