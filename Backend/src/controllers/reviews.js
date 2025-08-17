import {supabase} from '../../config/supabase.js'

export const getGameById = async (req, res) => {
  const gameId = req.params.id

  try {
    const { data: game, error: gameError } = await supabase
      .from("games")
      .select("*")
      .eq("id", gameId)
      .single()

    if (gameError) return res.status(500).json({ error: gameError.message });
    if (!game) return res.status(404).json({ error: "Juego no encontrado" });

    const { data: comentarios, error: comentariosError } = await supabase
      .from("comentarios")
      .select("*")
      .eq("game_id", gameId)
      .order("fecha", { ascending: false })

    if (comentariosError)
      return res.status(500).json({ error: comentariosError.message })

    res.json({ game, comentarios: comentarios || [] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
