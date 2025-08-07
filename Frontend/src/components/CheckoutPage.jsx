// src/components/CheckoutPage.jsx
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import OrderItem from './OrderItem'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const { cart } = useContext(AppContext)
  const [shipping, setShipping] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    telefono: ''
  })
  const [payment, setPayment] = useState({
    tarjeta: '',
    expiracion: '',
    cvv: ''
  })

  const handleShipChange = e =>
    setShipping({ ...shipping, [e.target.name]: e.target.value })

  const handlePayChange = e =>
    setPayment({ ...payment, [e.target.name]: e.target.value })

  const items = cart
  const subtotal = items.reduce(
    (sum, item) => sum + (parseFloat(item.precio) || 0) * item.qty,
    0
  )

  return (
    <div className="checkout-container">
      <h2>Proceso de pago</h2>

      {/*  Información de envío */}
      <div className="section">
        <h3>Información de envío</h3>

        <label>Nombre completo</label>
        <input
          name="nombre"
          value={shipping.nombre}
          onChange={handleShipChange}
          placeholder="Ingresa tu nombre"
        />

        <label>Dirección</label>
        <input
          name="direccion"
          value={shipping.direccion}
          onChange={handleShipChange}
          placeholder="Ingresa tu dirección"
        />

        <div className="fields-row">
          <div>
            <label>Ciudad</label>
            <input
              name="ciudad"
              value={shipping.ciudad}
              onChange={handleShipChange}
              placeholder="Ingresa tu ciudad"
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
          placeholder="Ingresa tu número de teléfono"
        />
      </div>

      {/*  Pago con tarjeta de crédito */}
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

      {/*  Order Summary dinámico */}
      <div className="order-summary">
        <h3>Order Summary</h3>

        {items.length === 0 ? (
          <p>No tienes artículos en el carrito.</p>
        ) : (
          items.map((item, idx) => <OrderItem key={idx} item={item} />)
        )}

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
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
      </div>

      <button className="button-buy">Comprar</button>
    </div>
  )
}

