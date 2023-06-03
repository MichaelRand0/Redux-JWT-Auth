// @ts-nocheck

import getDB from "../helpers/getDB.mjs"

export default async (req, res) => {
  const db = await getDB()
  res.send(db.users)
}