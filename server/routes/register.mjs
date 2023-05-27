import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')

export default (req, res) => {
  console.log('file', file)
}