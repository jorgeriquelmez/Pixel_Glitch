import db from '../config/db.js';

export const getAllCheckouts = async () => {
  const result = await db.query('SELECT * FROM checkout');
  return result.rows;
};

export const createCheckout = async (checkout) => {
  const {
    user_id, nombre, direccion, ciudad, codigo_postal, telefono, tarjeta, expiracion, cvv
  } = checkout;

  const result = await db.query(
    `INSERT INTO checkout (user_id, nombre, direccion, ciudad, codigo_postal, telefono, tarjeta, expiracion, cvv)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [user_id, nombre, direccion, ciudad, codigo_postal, telefono, tarjeta, expiracion, cvv]
  );

  return result.rows[0];
};
