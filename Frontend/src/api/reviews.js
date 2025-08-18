import { supabase } from "../../../Backend/config/supabase.js";

export const getGameById = async (id) => {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const getComentariosByGameId = async (gameId) => {
  const { data, error } = await supabase
    .from("comentarios")
    .select("*")
    .eq("game_id", gameId);

  if (error) throw error;
  return data;
};
