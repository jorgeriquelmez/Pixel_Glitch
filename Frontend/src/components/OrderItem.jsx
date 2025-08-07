import React from 'react'

/**
 * OrderItem
 * Props:
 *  - item: { nombre, imagen, qty, precio }
 */
export default function OrderItem({ item }) {
  return (
    <div className="item">
      <img src={item.imagen} alt={item.nombre} />
      <div>
        <p>{item.nombre}</p>
        <p>Cantidad: {item.qty}</p>
      </div>
    </div>
  )
}
