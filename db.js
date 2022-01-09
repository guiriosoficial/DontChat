const  mongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const config = { useUnifiedTopology: true }

const callback = (error, connection) => {
    if (error) {
        throw error
    } else {
        global.connection = connection.db('dontchat')
        console.log('MongoDB Connected...');
    }
}

mongoClient.connect(url, config, callback)

const messagesCollection = () => {
    return global.connection.collection('messages')
}

const getMessages = (roomPath) => {
    return messagesCollection().find({ roomPath }).toArray()
}

const pushMessage = (messageData) => {
    return messagesCollection().insertOne(messageData)
}
 
module.exports = {
    getMessages,
    pushMessage
}