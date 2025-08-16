import db from '../../config/db.js'

export const getAllGames = async () => {
  const result = await db.query('SELECT * FROM games ORDER BY id ASC')
  return result.rows
}

export const createGame = async (game) => {
  const { nombre, plataforma, precio, imagen } = game
  const result = await db.query(
    `INSERT INTO games (nombre, plataforma, precio, imagen)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombre, plataforma, precio, imagen]
  )
  return result.rows[0]
}

export const deleteGame = async (id) => {
  await db.query('DELETE FROM games WHERE id = $1', [id])
}
