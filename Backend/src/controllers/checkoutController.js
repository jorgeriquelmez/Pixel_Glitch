import { getAllCheckouts, createCheckout } from '../models/checkoutModel.js';

export const getCheckouts = async (req, res) => {
  try {
    const checkouts = await getAllCheckouts();
    res.json(checkouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCheckout = async (req, res) => {
  try {
    const newCheckout = await createCheckout(req.body);
    res.status(201).json(newCheckout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

