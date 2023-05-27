import express from 'express'
import bodyParser from 'body-parser'
import loginRoute from './routes/login.mjs'
import usersRoute from './routes/users.mjs'
import registerRoute from './routes/register.mjs'
const app = express()

const PORT = 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.post("/signin", loginRoute)
app.post('/register', registerRoute)
app.get('/users', usersRoute)

app.listen(PORT, () => {
  console.log(`Express server started on port: ${PORT}`)
})