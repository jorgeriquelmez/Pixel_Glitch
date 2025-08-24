import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import portadaImage from '../assets/portada.jpeg';
import './ExplorerPage.css';
import CardGame from './CardGame';

const ExplorerPage = () => {
  const [allGames, setAllGames] = useState([]);
  const [latestGames, setLatestGames] = useState([]);
  const [topSellingGames, setTopSellingGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // const response = await fetch('https://pixel-glitch.onrender.com/api/games');
        const response = await fetch('http://localhost:3000/api/games');
        if (!response.ok) {
          throw new Error('Error al obtener los juegos');
        }
        const gamesData = await response.json();
        setAllGames(gamesData);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    if (allGames.length > 0) {
      const sortedLatest = [...allGames].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      setLatestGames(sortedLatest.slice(0, 4));

      const sortedByPopularity = [...allGames].sort((a, b) => b.popularity - a.popularity);
      setTopSellingGames(sortedByPopularity.slice(0, 4));
    }
  }, [allGames]);

  if (isLoading) {
    return <div className="text-center my-5">Cargando juegos...</div>;
  }

  if (error) {
    return <div className="text-center my-5">Error: {error}</div>;
  }

  return (
    <div className="explorer-container">
      <Container className="portada-section">
        <div className="portada-wrapper">
          <img src={portadaImage} alt="Descripción de la imagen" className="portada-image" />
        </div>
      </Container>
      <Container className="lanzamientos-section">
        <h1 className="text-center my-4">Nuevos lanzamientos</h1>
        <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
          {latestGames.map((game) => (
            <Col key={game.id}>
              <CardGame game={game} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="top-section">
        <h1 className="text-center my-4">Top Ventas</h1>
        <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
          {topSellingGames.map((game) => (
            <Col key={game.id}>
              <CardGame game={game} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="categories-section">
        <h2 className="text-center my-5">Categorías</h2>
        <Row className="mb-4">
          <Col md={4}>
            <Link to="/genre/acción" className="category-card">
              <img src="https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/accion.jpg" alt="Accion" className="category-image" />
              <div className="category-overlay"><span>Accion</span></div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/genre/aventura" className="category-card">
              <img src="https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/aventura.jpg" alt="Aventura" className="category-image" />
              <div className="category-overlay"><span>Aventura</span></div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/genre/rpg" className="category-card">
              <img src="https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/rpg.jpg" alt="RPG" className="category-image" />
              <div className="category-overlay"><span>RPG</span></div>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Link to="/genre/estrategia" className="category-card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShBa45DthoN9U4n4P7_tLAXSnOeV7ZMVLiLg&s" alt="Estrategia" className="category-image" />
              <div className="category-overlay"><span>Estrategia</span></div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/genre/simulador" className="category-card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfCmPOz3-7c46RndPrVvDBzzLzACwioj3Aqg&s" alt="Simulacion" className="category-image" />
              <div className="category-overlay"><span>Simulacion</span></div>
            </Link>
          </Col>
          <Col md={4}>
            <Link to="/genre/deportes" className="category-card">
              <img src="https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/deportes.jpg" alt="Deportes" className="category-image" />
              <div className="category-overlay"><span>Deportes</span></div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ExplorerPage;