import getDB from "../helpers/getDB.mjs"

export default (req, res) => {
  const db = getDB()
  res.send(db)
}