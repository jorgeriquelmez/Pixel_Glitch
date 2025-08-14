import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaCarrito from "./Cart/Tabla";
import Swal from "sweetalert2";
import "./Cart.css";
import miLogo from "../assets/logo2.png";
import productosIniciales from "../data/cart.json"; // Solo para pruebas locales
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        /*
        const res = await axios.get("", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Si tu API necesita auth
          },
        });
        setProductos(res.data);
        return;
        */
        setProductos(productosIniciales);

      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    cargarProductos();
  }, []);

  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const envio = 0;
  const total = subtotal + envio;

  const manejarCompraGratis = () => {
    Swal.fire({
      title: "Oops, compra gratis!!",
      imageUrl: miLogo,
      imageWidth: 80,
      imageHeight: 80,
      imageAlt: "Imagen personalizada",
      confirmButtonText: "Aceptar",
      customClass: {
        popup: 'mi-popup',
        title: 'mi-titulo',
        confirmButton: 'mi-boton-confirmar'
      }
    }).then(() => {
      setProductos([])
    })
  }

  return (
    <main className="carro-compras">
      <h1>Carro de compras</h1>

      <TablaCarrito productos={productos} />

      <section className="resumen-compra">
        <h2>Resumen de compra</h2>
        <div className="resumen-item">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="resumen-item">
          <span>Envío</span>
          <span>{envio === 0 ? "Gratis" : `$${envio.toFixed(2)}`}</span>
        </div>
        <div className="resumen-item total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button onClick={manejarCompraGratis}>Ir a Pagar</button>
      </section>
    </main>
  );
};

export default Cart;
