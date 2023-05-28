import checkUserExists from '../helpers/checkUserExists.mjs'
import jwt from 'jsonwebtoken'

const createToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
}

export default async (req, res) => {
  const { login, password } = req.body
  console.log('REQ BODY:', req.body)
  if (checkUserExists(login, password)) {
    const token = createToken({ login, password })
    res.cookie('token', token, {
      httpOnly: true,
    })
    res.status(200).json({
      message: 'Successfully authorized',
      token,
    })
  } else {
    res.status(401).json({
      message: 'Incorrect login or password',
    })
  }
}
