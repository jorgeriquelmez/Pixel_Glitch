import React from 'react';

/**
 * GameRow Component
 * Props:
 * - idx: index in the array
 * - juego: { id, title, platforms, price, image, genre, release_date, popularity }
 * - onDelete: function to delete this game
 * - onEdit: function to edit this game
 */
export default function GameRow({ idx, juego, onDelete, onEdit }) {
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{juego.title}</td> 
      <td>{juego.platforms}</td>
      <td>${juego.price}</td>
      <td>
        <div className="btn-container">
          <button className="btn-edit" onClick={onEdit}>
            Editar
          </button>
          <button className="btn-delete" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}