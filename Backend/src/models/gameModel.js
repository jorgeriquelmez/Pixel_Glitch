import { supabase } from '../../config/supabase.js';

// Obtener todos los juegos
export const getGames = async () => {
  const { data, error } = await supabase
    .from('games')
    .select('*');

  if (error) throw error;
  return data;
};

// Obtener un juego por ID
export const getGameById = async (id) => {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Crear un nuevo juego (acceso seguro)
export const createGame = async (data) => {
  const { id, ...gameData } = data;

  // Validación opcional para prevenir errores silenciosos
  if (
    !gameData.title ||
    isNaN(parseFloat(gameData.price)) ||
    isNaN(parseFloat(gameData.popularity))
  ) {
    throw new Error('Datos del juego inválidos');
  }

  const { data: inserted, error } = await supabase
    .from('games')
    .insert([gameData])
    .select(); // no usamos single para prevenir errores

  if (error) throw error;

  // Asegurar que al menos un juego fue insertado
  if (!inserted || inserted.length === 0) {
    throw new Error('Error al insertar el juego');
  }

  return inserted[0]; // devolvemos el primero
};

// Actualizar un juego existente
export const updateGame = async (id, data) => {
  const { title, platforms, price, image, genre, release_date, popularity } = data;

  const { data: updatedGame, error } = await supabase
    .from('games')
    .update({ title, platforms, price, image, genre, release_date, popularity })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return updatedGame;
};

// Eliminar un juego
export const deleteGame = async (id) => {
  const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

