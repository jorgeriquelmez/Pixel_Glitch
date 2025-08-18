import React from "react";
import Estrellas from "./Estrellas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Comentario = ({ comentario }) => (
  <div className="comentario" key={comentario.id}>
    <img src={comentario.avatar} alt={comentario.usuario} className="avatar" />
    <div className="contenido-comentario">
      <strong>{comentario.usuario}</strong>
      <small>{comentario.fecha}</small>
      <Estrellas puntaje={comentario.puntaje} />
      <p>{comentario.comentario}</p>
      <div className="reacciones">
        <span className="like">
          <FontAwesomeIcon icon={faThumbsUp} /> {comentario.likes}
        </span>
        <span className="dislike">
          <FontAwesomeIcon icon={faThumbsDown} /> {comentario.dislikes}
        </span>
      </div>
    </div>
  </div>
)

export default Comentario;
