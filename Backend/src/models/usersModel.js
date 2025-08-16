import { supabase } from '../../config/supabase.js';
import bcrypt from 'bcrypt';
// Registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones simples
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password son requeridos' });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({ message: 'Usuario creado', data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Login de usuario
export const loginUser = async ({ email, password }) => {
  // Buscar el usuario por email
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single(); // devuelve un solo registro

  if (error || !data) {
    return { data: null, error: new Error('Usuario no encontrado') };
  }

  // Comparar la contraseña enviada con el hash de la DB
  const match = await bcrypt.compare(password, data.password);
  if (!match) {
    return { data: null, error: new Error('Credenciales inválidas') };
  }

  return { data, error: null };
};



export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .select(); // devuelve el usuario eliminado

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado', user: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    // Creamos un objeto con los campos a actualizar
    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 12);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No hay campos para actualizar' });
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select(); // devuelve el usuario actualizado

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario actualizado', user: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw new Error(error.message);
  return data;
};