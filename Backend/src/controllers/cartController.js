import { supabase } from "../../config/supabase.js"; // Conexión a Supabase

export const getCart = async (req, res) => {
  try {
    // Supongamos que guardas los productos en una tabla "cart"
    const { data, error } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", req.user.id); // Ejemplo usando user_id

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { producto } = req.body;
    const { data, error } = await supabase
      .from("cart")
      .insert([{ ...producto, user_id: req.user.id }]);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", req.user.id);

    if (error) throw error;
    res.json({ message: "Carrito eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
