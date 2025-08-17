import { supabase } from '../../config/supabase.js'

export const getAllGames = async () => {
  const { data, error } = await supabase.from('games').select('*').order('id', { ascending: true })
  if (error) throw error
  return data
}

export const createGame = async (game) => {
  const { nombre, plataforma, precio, imagen } = game

  const { data, error } = await supabase.from('games').insert([
    { nombre, plataforma, precio, imagen }
  ]).select().single()

  if (error) throw error
  return data
}

export const deleteGame = async (id) => {
  const { error } = await supabase.from('games').delete().eq('id', id)
  if (error) throw error
}

// --- Nuevo método para traer un juego con hasta 2 comentarios ---
export const getGameByIdWithComments = async (id) => {
  // Traer el juego
  const { data: gameData, error: gameError } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single()
  if (gameError) throw gameError
  if (!gameData) return null

  // Traer hasta 2 comentarios para ese juego
  const { data: comentariosData, error: commentsError } = await supabase
    .from('comentarios')
    .select('*')
    .eq('game_id', id)
    .order('id', { ascending: true })
    .limit(2)
  if (commentsError) throw commentsError

  return {
    game: gameData,
    comentarios: comentariosData
  }
}
