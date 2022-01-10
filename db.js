const  { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const config = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

const client = new MongoClient(url, config)

async function main() {
    await client.connect()
    console.log('Connected successfully to server')

    const db = client.db('dontchat')
    const collection = db.collection('messages')

    // const findMessages = await collection.find({ roomPath }).toArray()
    // console.log('Found messages =>', findMessages)

    // const insertMessage = await collection.insertOne(messageData)
    // console.log('insertedMessage =>', insertMessage)

    return 'done.'
}

// const messagesCollection = () => {
//     return global.connection.collection('messages')
// }

// const getMessages = (roomPath) => {
//     return messagesCollection().find({ roomPath }).toArray()
// }

// const pushMessage = (messageData) => {
//     return messagesCollection().insertOne(messageData)
// }

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())
 
// module.exports = {
//     getMessages,
//     pushMessage
// }