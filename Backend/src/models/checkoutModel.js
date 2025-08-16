import { supabase } from '../../config/supabase.js';

export const getAllCheckouts = async () => {
  const { data, error } = await supabase.from('checkout').select('*')
  if (error) throw error
  return data
}

export const createCheckout = async (checkout) => {
  const {
    user_id, nombre, direccion, ciudad, codigo_postal, telefono, tarjeta, expiracion, cvv
  } = checkout

  const { data, error } = await supabase.from('checkout').insert([
    {
      user_id,
      nombre,
      direccion,
      ciudad,
      codigo_postal,
      telefono,
      tarjeta,
      expiracion,
      cvv
    }
  ]).select().single()

  if (error) throw error
  return data
}
