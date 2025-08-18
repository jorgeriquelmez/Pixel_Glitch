import axios from "axios";

export const addToCart = async (gameId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/cart",
      { gameId, cantidad: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Producto agregado al carrito");
  } catch (error) {
    console.error("Error agregando al carrito:", error);
  }
};
