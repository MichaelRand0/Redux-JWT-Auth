import { readFileSync } from 'node:fs';

export default () => {
  return JSON.parse(readFileSync('server/db.json', 'utf-8'))
}