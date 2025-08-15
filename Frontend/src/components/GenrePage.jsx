import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import games from '../data/games.json'; 
import './ExplorerPage.css'; 

const GenrePage = () => {

    const { category } = useParams();
    const filteredGames = games.filter(game => game.genre.toLowerCase() === category.toLowerCase());

    return (
        <div className="genre-page-container">
            <Container className="my-5">
                <Link to="/" className="btn btn-secondary mb-4">
                    Volver a Inicio
                </Link>
                <h1 className="text-center my-4">Juegos de la categoría "{category}"</h1>
                
                {filteredGames.length > 0 ? (
                    <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
                        {filteredGames.map((game) => (
                            <Col key={game.id}>
                                <Card className="h-100 card-game">
                                    <div className="image-container">
                                        <Card.Img variant="top" src={game.image} />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{game.title}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="text-center">No se encontraron juegos para esta categoría.</p>
                )}
            </Container>
        </div>
    );
};

export default GenrePage;