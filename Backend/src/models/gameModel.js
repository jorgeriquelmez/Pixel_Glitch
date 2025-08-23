import { supabase } from '../../config/supabase.js'

export const getAllGames = async () => {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('id', { ascending: true })
  if (error) throw error
  return data
}

export const createGame = async (game) => {
  const { title, platforms, price, image, genre, release_date, popularity } =
    game
  const { data, error } = await supabase
    .from('games')
    .insert([
      { title, platforms, price, image, genre, release_date, popularity }
    ])
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteGame = async (id) => {
  const { error } = await supabase.from('games').delete().eq('id', id)
  if (error) throw error
}

// Método para actualizar un juego existente
export const updateGame = async (id, updatedData) => {
  const { data, error } = await supabase
    .from('games')
    .update(updatedData)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// Traer un juego por ID con comentarios
export const getGameByIdWithComments = async (id) => {
  const { data: gameData, error: gameError } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single()

  if (gameError) throw gameError
  if (!gameData) return null

  const { data: comentariosData, error: commentsError } = await supabase
    .from('comentarios')
    .select('*')
    .eq('game_id', id)
    .order('id', { ascending: true })
  if (commentsError) throw commentsError

  return {
    ...gameData,
    comentarios: comentariosData
  }
}
