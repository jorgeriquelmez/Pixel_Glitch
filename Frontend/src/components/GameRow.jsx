import React from 'react'

/**
 * GameRow
 * Props:
 *  - idx: índice en el array
 *  - juego: { nombre, plataforma, precio, imagen }
 *  - onDelete: función para borrar este juego
 */
export default function GameRow({ idx, juego, onDelete }) {
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{juego.nombre}</td>
      <td>{juego.plataforma}</td>
      <td>${juego.precio}</td>
      <td>
        <button className="btn-delete" onClick={onDelete}>
          Eliminar
        </button>
      </td>
    </tr>
  )
}
