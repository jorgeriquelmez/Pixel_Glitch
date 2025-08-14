import React, { useEffect, useState } from "react";
import Barras from "./Review/Barras";
import Estrellas from "./Review/Estrellas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import "./Review.css";
import dataLocal from "../data/reviews.json"; // Datos locales para pruebas
import axios from "axios";

function Reviews() {
  const [producto, setProducto] = useState({});
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        /*
        const res = await axios.get("https://miapi.com/reviews/123", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducto(res.data.producto);
        setComentarios(res.data.comentarios);
        return;
        */

        setProducto(dataLocal.producto);
        setComentarios(dataLocal.comentarios);

      } catch (error) {
        console.error("Error cargando reviews:", error);
      }
    };

    cargarDatos();
  }, []);

  return (
    <div className="reviews-container">

      <div className="gameCard">
        <div className="banner">
          <h1 className="gameName">{producto.nombre}</h1>
        </div>
        <figure className="gameImg">
          <img src={producto.imagen} alt={producto.nombre} />
        </figure>
        <p className="gameDesc">{producto.descripcion}</p>
      </div>

      <section className="puntuacion">
        <div className="evaluacion">
          <h2>Evaluación</h2>
          <h1>{producto.ratingPromedio}</h1>
          <p>{producto.totalReviews} reviews</p>
        </div>
        <div className="bars"></div>
        <Barras distribucion={producto.distribucionEstrellas} />
      </section>

      <section className="comentarios">
        {comentarios.map((c) => (
          <div className="comentario" key={c.id}>
            <img src={c.avatar} alt={c.usuario} className="avatar" />
            <div className="contenido-comentario">
              <strong>{c.usuario}</strong>
              <small>{c.fecha}</small>
              <Estrellas puntaje={c.puntaje} />
              <p>{c.comentario}</p>

              <div className="reacciones">
                <span className="like">
                  <FontAwesomeIcon icon={faThumbsUp} /> {c.likes}
                </span>
                <span className="dislike">
                  <FontAwesomeIcon icon={faThumbsDown} /> {c.dislikes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="precio">
        <h3>Precio</h3>
        <p>${producto.precio}</p>
        <div className="botones">
          <button className="btn">Agregar al carrito</button>
          <button className="btn">Agregar a favoritos</button>
        </div>
      </section>
    </div>
  );
}

export default Reviews;
