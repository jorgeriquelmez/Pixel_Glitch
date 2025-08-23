import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Barras from "./Review/Barras";
import Estrellas from "./Review/Estrellas";
import { AppContext } from "../context/AppContext";
import "./Review.css";

function Reviews() {
  const { id } = useParams();
  const { addToCart } = useContext(AppContext);
  const [producto, setProducto] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [rawResponse, setRawResponse] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(`https://pixel-glitch.onrender.com/api/games/${id}?limit=2`);
        const raw = res.data;
        console.log("RAW response from backend:", raw);
        setRawResponse(raw);

        const source = raw && raw.game ? raw.game : raw;
        const comentariosArr = raw?.comentarios ?? source?.comentarios ?? [];

        const title = source?.title ?? source?.nombre ?? "";
        const image = source?.image ?? source?.imagen ?? "";
        const description = source?.description ?? source?.descripcion ?? "";
        const price = source?.price ?? source?.precio ?? 0;
        const popularity = source?.popularity ?? source?.popularidad ?? 0;

        let distribucion = raw?.distribucionEstrellas ?? source?.distribucionEstrellas ?? null;
        if (!distribucion) {
          distribucion = { 5:0,4:0,3:0,2:0,1:0 };
          (raw?.allComentarios ?? source?.allComentarios ?? comentariosArr).forEach((c) => {
            const p = Number(c?.puntaje ?? c?.score ?? 0);
            if (p >= 1 && p <= 5) distribucion[p] = (distribucion[p] || 0) + 1;
          });
        }

        let totalReviews = raw?.totalReviews ?? source?.totalReviews ?? null;
        let ratingPromedio = raw?.ratingPromedio ?? source?.ratingPromedio ?? null;

        if (ratingPromedio == null) {
          const all = raw?.allComentarios ?? source?.allComentarios ?? null;
          const sourceForAvg = Array.isArray(all) ? all : comentariosArr;
          const suma = sourceForAvg.reduce((acc, c) => acc + Number(c?.puntaje ?? c?.score ?? 0), 0);
          const cnt = sourceForAvg.length;
          ratingPromedio = cnt ? (suma / cnt) : 0;
          totalReviews = totalReviews ?? cnt;
        }

        totalReviews = Number(totalReviews ?? 0);
        ratingPromedio = Number(ratingPromedio ?? 0);

        const productoNormalizado = {
          id: source?.id ?? source?.game_id ?? id,
          title,
          image,
          description,
          price,
          popularity,
          ratingPromedio,
          totalReviews,
          distribucionEstrellas: distribucion
        };

        setProducto(productoNormalizado);
        // <-- AQUI se limita la vista a 2 comentarios, sin tocar cálculo de rating
        setComentarios((comentariosArr || []).slice(0, 2));
      } catch (error) {
        console.error("Error al traer el juego", error);
        setProducto(null);
        setComentarios([]);
      }
    };

    fetchGame();
  }, [id]);

  const handleAddToCart = () => {
    if (!producto) return;
    addToCart(producto);
  };

  if (!producto) return <p>Cargando juego...</p>;

  return (
    <div className="reviews-container">
      <div className="gameCard">
        <div className="banner">
          <h1 className="gameName">{producto.title || "Sin título"}</h1>
          <p className="gamePopularity">Popularidad: {producto.popularity ?? 0}</p>
        </div>
        <figure className="gameImg">
          {producto.image ? <img src={producto.image} alt={producto.title} /> : <div className="no-image">No image</div>}
        </figure>
        <p className="gameDesc">{producto.description}</p>
      </div>

      <section className="puntuacion">
        <div className="evaluacion">
          <h2>Evaluación general</h2>
          <h1>{producto.ratingPromedio?.toFixed(1) ?? 0}</h1>
          <Estrellas puntaje={producto.ratingPromedio ?? 0} />
          <p>{producto.totalReviews ?? 0} reviews</p>
        </div>

        {producto.distribucionEstrellas && <Barras distribucion={producto.distribucionEstrellas} />}
      </section>

      <section className="comentarios">
        {comentarios.length === 0 && <p>No hay comentarios visibles.</p>}
        {comentarios.map((c) => (
          <div className="comentario" key={c.id ?? c._id ?? Math.random()}>
            <img src={c.avatar ?? ""} alt={c.usuario ?? "user"} className="avatar" />
            <div className="contenido-comentario">
              <strong>{c.usuario ?? "Anon"}</strong>
              <small>{c.fecha ?? ""}</small>
              <Estrellas puntaje={Number(c.puntaje ?? c.score ?? 0)} />
              <p>{c.comentario ?? c.text ?? ""}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="precio">
        <h3>Precio</h3>
        <p>${producto.price ?? 0}</p>
        <div className="botones">
          <button className="btn" onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
      </section>
    </div>
  );
}

export default Reviews;
