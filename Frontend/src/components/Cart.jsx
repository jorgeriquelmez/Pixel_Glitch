import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablaCarrito from "../components/Cart/TablaCarrito"; 
import Swal from "sweetalert2";
import "./Cart.css";
import miLogo from "../assets/logo2.png";
import { AppContext } from '../context/AppContext'; 

const Cart = () => {
    const navigate = useNavigate();
    const { cart, subtotal, total, setCart } = useContext(AppContext);

    // Limpia los productos iniciales que estaban cargando
    // useEffect(() => {
    //     setCart([]);
    // }, [setCart]);

    const manejarIrAPagar = () => {
        if (cart.length === 0) {
            Swal.fire({
                title: "Tu carrito está vacío",
                text: "Agrega productos para continuar",
                imageUrl: miLogo,
                imageWidth: 80,
                imageHeight: 80,
                imageAlt: "Pixel Glitch Logo",
                confirmButtonText: "Aceptar",
                customClass: {
                    popup: 'mi-popup',
                    title: 'mi-titulo',
                    confirmButton: 'mi-boton-confirmar'
                }
            });
        } else {
            navigate("/checkout");
        }
    };

    return (
        <main className="carro-compras">
            <h1>Carro de compras</h1>

            <TablaCarrito />

            <section className="resumen-compra">
                <h2>Resumen de compra</h2>
                <div className="resumen-item">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="resumen-item">
                    <span>Envío</span>
                    <span>Gratis</span>
                </div>
                <div className="resumen-item total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <button onClick={manejarIrAPagar}>Ir a Pagar</button>
            </section>
        </main>
    );
};

export default Cart;