// Archivo: GenrePage.jsx
// Este componente filtra y muestra los juegos según el género seleccionado.

import React from 'react';
import { useParams } from 'react-router-dom';
import gamesData from '../data/games.json'; // Importamos el archivo de datos de los juegos
import { Container, Row, Col, Card } from 'react-bootstrap';

const GenrePage = () => {
  const { genreName } = useParams();

  const filteredGames = gamesData.filter(game =>
    game.genre.toLowerCase().includes(genreName.toLowerCase())
  );

  return (
    <div className="games-display-container">

      <Container>
        <h1 className="text-center my-4">Juegos de {genreName}</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {/* Mostramos los juegos filtrados */}
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <Col key={game.title}>
                <Card className="game-card h-100">
                  <Card.Img variant="top" src={game.image} alt={game.title} />
                  <Card.Body className="game-info">
                    <Card.Title>{game.title}</Card.Title>
                    <Card.Text>Género: {game.genre}</Card.Text>
                    <Card.Text>Plataformas: {game.platforms}</Card.Text>
                    <Card.Text>Precio: {game.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No se encontraron juegos para este género.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default GenrePage;
