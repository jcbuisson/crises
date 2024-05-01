// app.js
import { expressX } from '@jcbuisson/express-x'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = expressX({
   WS_PATH: '/crises-socket-io/',
})

app.createService('crise', {
   findUnique: prisma.crise.findUnique,
   findMany: prisma.crise.findMany,
   create: prisma.crise.create,
   update: prisma.crise.update,
   delete: prisma.crise.delete,
})

const port = process.env.PORT

app.httpServer.listen(port, () => {
   console.log('info', `App is listening at http://localhost:${port}`)
})
