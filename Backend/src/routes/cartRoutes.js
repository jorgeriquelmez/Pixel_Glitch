import express from "express";
import { getCart, addToCart, clearCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.delete("/", authMiddleware, clearCart);

export default router;
