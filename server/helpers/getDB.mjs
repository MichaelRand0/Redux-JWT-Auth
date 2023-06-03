import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { JSONFile } from "lowdb/node"
import { Low } from 'lowdb'

export default async () => {
  const dir = dirname(fileURLToPath(import.meta.url))
  const file = join(dir, "../db.json")
  const adapter = new JSONFile(file)
  const defaultData = { users: [{login: "default user", password: "default password"}] }
  const db = new Low(adapter, defaultData)
  await db.read()
  return db.data
}
