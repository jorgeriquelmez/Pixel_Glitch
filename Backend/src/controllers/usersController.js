import { supabase } from '../../config/supabase.js';
import { loginUser, getUserProfile, getAllUsers } from '../models/usersModel.js';
import bcrypt from 'bcrypt';

// POST /users/register
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword }])
      .select(); // devuelve fila insertada

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: 'Usuario creado', user: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /users/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await loginUser({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.json({ message: 'Login exitoso', data });
};

// GET /users/profile
export const profile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { data, error } = await getUserProfile(token);
  if (error) return res.status(401).json({ error: error.message });
  res.json(data.user);
};

// GET /users/all
export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .select();

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado', user: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
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
      .select();

    if (error) return res.status(400).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario actualizado', user: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
