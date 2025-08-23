import React from 'react';

/**
 * GameRow
 * Props:
 * - idx: índice en el array
 * - juego: { id, title, platforms, price, image, genre, release_date, popularity }
 * - onDelete: función para borrar este juego
 * - onEdit: función para editar este juego
 */
export default function GameRow({ idx, juego, onDelete, onEdit }) {
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{juego.title}</td>
      <td>{juego.platforms}</td>
      <td>${juego.price}</td>
      <td>
        <button className="btn-edit" onClick={onEdit}>
          Editar
        </button>
        <button className="btn-delete" onClick={onDelete}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}