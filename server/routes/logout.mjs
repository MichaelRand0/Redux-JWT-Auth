
export default async (req, res, next) => {
  res.clearCookie('token')
  next()
}