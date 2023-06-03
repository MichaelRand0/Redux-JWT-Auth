import bcrypt from 'bcryptjs'
import getDB from './getDB.mjs'

const checkUserExists = async (login, password) => {
  const db = await getDB()
  return db.users.some((user) => {
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    return user.login === login && isPasswordMatch
  })
}

export default checkUserExists
