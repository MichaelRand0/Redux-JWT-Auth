
const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))

server.db = router.db

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

server.use(auth)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
