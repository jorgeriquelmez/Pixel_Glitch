import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './TablaCarrito.css';

const TablaCarrito = () => {
    const { cart, increaseQuantity, decreaseQuantity } = useContext(AppContext);

    if (cart.length === 0) {
        return (
            <div className="empty-cart-message">
                Tu carrito está vacío.
            </div>
        );
    }

    return (
        <div className="tabla-carrito-container">
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Plataforma</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={`${item.id}-${item.platform}`}>
                            <td className="producto-info">
                                <img src={item.image} alt={item.title} className="producto-imagen" />
                                <span>{item.title}</span>
                            </td>
                            <td>{item.platform}</td>
                            <td className="cantidad-controls">
                                <button onClick={() => decreaseQuantity(item.id, item.platform)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.id, item.platform)}>+</button>
                            </td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaCarrito;