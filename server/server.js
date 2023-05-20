const jsonServer = require('json-server')
const server = jsonServer.create()
const fs = require('fs')
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  if (req.method === 'POST') {
    if (req.path === '/users') {
      const { login } = req.body
      const bd = JSON.parse(fs.readFileSync('server/db.json', 'utf-8'))
      const isUserAlreadyExists = bd.users.some((user) => user.login === login)
      if (isUserAlreadyExists) {
        router.render = (req, res) => {
          res.status(500).jsonp({
            message: 'User already exists',
          })
        }
      } else {
        router.render = (req, res) => {
          res.status(200).jsonp({
            message: 'User successfully created!',
          })
        }
      }
    }
  }
  next()
})

server.use(middlewares)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
