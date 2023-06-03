// @ts-ignore

import express from 'express'
import bodyParser from 'body-parser'
import loginRoute from './routes/login.mjs'
import usersRoute from './routes/users.mjs'
import verifyRoute from './routes/verify.mjs'
import logoutRoute from './routes/logout.mjs'
import registerRoute from './routes/register.mjs'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

app.get('/users', usersRoute)
app.post('/signin', loginRoute)
app.post('/logout', logoutRoute)
app.post('/register', registerRoute)
app.post('/verify', verifyRoute)

export default app
