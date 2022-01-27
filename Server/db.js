const { connect } = require('mongoose')

const db = connect(process.env.CONNECTION_STRING_URI)
    .then(() => {
        console.log('MongoBD connected...')
    })
    .catch(err => {
        console.error('Faild to connect with MongoDB')
        throw new Error(err)
    })

module.exports = db
