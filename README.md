# DONTCHAT
Inspired by [Dontpad.com](http://dontpad.com), DontChat is a url based chat.

## Description
This is an Open Source project made just to study socket.io, node.js with express.js and react.js with redux.

## Project Setup
### Front-End (Client)
- **Go to Folder**:
```
cd client
```
- **Install Dependencies:**
```
npm install
```
- **Start Development Serve:**
```
npm start
```
Will Run on [http://localhost:5173/](http://localhost:3000/)

- **Compiles For Production:**
```
npm run build
```
Will be Build in `/build`

### Back-End (Server)
- **Go to Folder**:
```
cd server
```
- **Run MongoDB:** - (Create data directory on locale of your preference)
```
# MongoDB Comunity is Required
mongod --dbpath <path to data directory>
```
- **Install Dependencies:**
```
npm install
```
- **Start Development Serve:**
```
npm start
```
Will Run on [http://localhost:3000/](http://localhost:3001/)

## TODO
- Add Ant-spam System
- Implements TypeScript in Server
- Create Docker Documentation
- 