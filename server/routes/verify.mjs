// @ts-nocheck

import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = req.cookies.token
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY)
    req.user = user
    res.status(200).json({
      message: 'Token is valid',
      data: {
        user: user.login,
        token
      },
    })
  } catch (error) {
    res.clearCookie('token')
    res.status(401).json({
      message: 'Invalid token',
    })
  }
}