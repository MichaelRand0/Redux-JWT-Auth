import checkUserExists from '../helpers/checkUserExists.mjs'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'hello json-server'
const expiresIn = '1hr'

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

export default async (req, res) => {
  const { login, password } = req.body
  console.log('REQ BODY:', req.body)
  if (checkUserExists(login, password)) {
    const token = createToken({ login, password })
    res.status(200).json({
      message: 'Successfully authorized',
      token,
    })
    // res.cookie('token', token, {
    //   httpOnly: true,
    // })
  } else {
    res.status(401).json({
      message: 'Incorrect login or password',
    })
  }
}
