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

