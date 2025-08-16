import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Token recibido en middleware:", token);
  console.log("JWT_SECRET actual:", process.env.JWT_SECRET);

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
