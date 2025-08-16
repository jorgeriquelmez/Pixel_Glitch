import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import OrderItem from './OrderItem';
import './CheckoutPage.css';
import { AppContext } from '../context/AppContext';
import miLogo from "../assets/logo2.png";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { cart, subtotal, total} = useContext(AppContext); 

    const [shipping, setShipping] = useState({
        nombre: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        telefono: ''
    });
    
    const [payment, setPayment] = useState({
        tarjeta: '',
        expiracion: '',
        cvv: ''
    });

    const isFormValid = shipping.nombre !== '' && shipping.direccion !== '' && shipping.ciudad !== '' && shipping.telefono !== '';

    const handleShipChange = e =>
        setShipping({ ...shipping, [e.target.name]: e.target.value });

    const handlePayChange = e =>
        setPayment({ ...payment, [e.target.name]: e.target.value });

    const handleBuyClick = () => {
        if (isFormValid) {
            Swal.fire({
                title: "¡Felicidades!",
                text: "Has ganado una compra gratis por ser uno de nuestros clientes destacados.",
                imageUrl: miLogo,
                imageWidth: 80,
                imageHeight: 80,
                imageAlt: "Pixel Glitch Logo",
                confirmButtonText: "¡Genial!",
                customClass: {
                    popup: 'mi-popup',
                    title: 'mi-titulo',
                    confirmButton: 'mi-boton-confirmar'
                }
            }).then(() => {
                navigate('/');
            });
        }
    };
    
    const items = cart;

    return (
        <div className="checkout-container">
            <h2>Proceso de pago</h2>

            <div className="section">
                <h3>Información de envío</h3>

                <label>Nombre completo</label>
                <input
                    name="nombre"
                    value={shipping.nombre}
                    onChange={handleShipChange}
                    placeholder="Ingresa nombre (obligatorio)"
                />

                <label>Dirección</label>
                <input
                    name="direccion"
                    value={shipping.direccion}
                    onChange={handleShipChange}
                    placeholder="Ingresa dirección (obligatorio)"
                />

                <div className="fields-row">
                    <div>
                        <label>Ciudad</label>
                        <input
                            name="ciudad"
                            value={shipping.ciudad}
                            onChange={handleShipChange}
                            placeholder="Ingresa ciudad (obligatorio)"
                        />
                    </div>
                    <div>
                        <label>Código Postal</label>
                        <input
                            name="codigoPostal"
                            value={shipping.codigoPostal}
                            onChange={handleShipChange}
                            placeholder="Ingresa tu código postal"
                        />
                    </div>
                </div>

                <label>Número de Teléfono</label>
                <input
                    name="telefono"
                    value={shipping.telefono}
                    onChange={handleShipChange}
                    placeholder="Ingresa tu número de teléfono (obligatorio)"
                />
            </div>

            <div className="section">
                <h3>Pago con tarjeta de crédito</h3>

                <label>Número de tarjeta</label>
                <input
                    name="tarjeta"
                    value={payment.tarjeta}
                    onChange={handlePayChange}
                    placeholder="Ingresa tu tarjeta"
                />

                <div className="fields-row">
                    <div>
                        <label>Fecha de expiración</label>
                        <input
                            name="expiracion"
                            value={payment.expiracion}
                            onChange={handlePayChange}
                            placeholder="MM/YY"
                        />
                    </div>
                    <div>
                        <label>CVV</label>
                        <input
                            name="cvv"
                            value={payment.cvv}
                            onChange={handlePayChange}
                            placeholder="CVV"
                        />
                    </div>
                </div>
            </div>

            <div className="order-summary">
                <h3>Resumen de la orden</h3>

                {/* {items.length === 0 ? (
                    <p>No tienes artículos en el carrito.</p>
                ) : (
                    items.map((item, idx) => <OrderItem key={idx} item={item} />)
                )} */}

                <div className="summary-line">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                    <span>Envío</span>
                    <span>Gratis</span>
                </div>
                <div className="summary-line">
                    <strong>Total</strong>
                    <strong>${total.toFixed(2)}</strong>
                </div>
            </div>

            <button
                className="button-buy"
                onClick={handleBuyClick}
                disabled={!isFormValid}
            >
                Comprar
            </button>
        </div>
    );
}