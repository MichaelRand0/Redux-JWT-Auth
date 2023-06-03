// @ts-nocheck

import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import checkUserExists from '../helpers/checkUserExists.mjs'
import bcrypt from 'bcryptjs'

const dir = dirname(fileURLToPath(import.meta.url))
const file = join(dir, '../db.json')

const adapter = new JSONFile(file)
const defaultData = { users: [] }
const db = new Low(adapter, defaultData)

export default async (req, res) => {
  await db.read()
  const { login, password } = req.body
  if (await checkUserExists(login, password)) {
    res.status(500).json({
      message: 'User already exists',
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const newUser = {
      login,
      password: hash,
    }
    db.data.users.push(newUser)
    await db.write()
    res.status(200).json({
      message: 'Account successfully created!',
    })
  }
}
