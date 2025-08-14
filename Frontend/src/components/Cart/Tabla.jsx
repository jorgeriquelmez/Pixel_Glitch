import React from "react";
import "../Cart.css";

function TablaCarrito({ productos }) {
  return (
    <table className="tabla-carrito">
      <thead>
        <tr>
          <th>Item</th>
          <th>Plataforma</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td>{p.nombre}</td>
            <td className="plataforma">{p.plataforma}</td>
            <td>{p.cantidad}</td>
            <td>${p.precio.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaCarrito;
