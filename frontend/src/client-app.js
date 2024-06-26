import { io } from "socket.io-client"
import expressXClient from '@jcbuisson/express-x-client'


const socket = io({
   path: '/crises-socket-io/',
   transports: ["websocket"],
   reconnectionDelay: 1000,
   reconnectionDelayMax: 10000,
})

const app = expressXClient(socket, { debug: true })


function _getStorageSocketId() {
   if (typeof sessionStorage !== 'undefined') return sessionStorage.getItem('cnxid')
   return nodeCnxId
}

function _setStorageSocketId(id) {
   if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('cnxid', id)
   } else {
      nodeCnxId = id
   }
}

app.onConnectError((socket, err) => {
   console.log('CNX ERROR!!!', socket.id, err.code)
})

app.onConnect(async (socket) => {
   const socketId = socket.id
   console.log('connect', socketId)
   // look for a previously stored connection id
   const prevSocketId = _getStorageSocketId()
   if (prevSocketId) {
      // it's a connection after a reload/refresh
      // ask server to transfer all data from connection `prevSocketId` to connection `socketId`
      console.log('cnx-transfer', prevSocketId, 'to', socketId)
      await socket.emit('cnx-transfer', prevSocketId, socketId)
      // update connection id
      _setStorageSocketId(socketId)

   } else {
      // set connection id
      _setStorageSocketId(socketId)
   }

   socket.on('cnx-transfer-ack', async (fromSocketId, toSocketId) => {
      console.log('ACKACK!!!', fromSocketId, toSocketId)
   })

   socket.on('expired', async () => {
      console.log("server app-hook sent 'expired' event")
   })
})

export default app
