import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import CardGame from './CardGame'; 
import './GamesDisplay.css';

const GenrePage = () => {
    const { category } = useParams();
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/games');
                if (!response.ok) {
                    throw new Error('Error al obtener los juegos');
                }
                const gamesData = await response.json();
                setGames(gamesData);
            } catch (error) {
                console.error("Error al obtener los juegos:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGames();
    }, []);

    const filteredGames = games.filter(game =>
        game.genre.toLowerCase() === category.toLowerCase()
    );

    if (isLoading) {
        return <div className="text-center my-5">Cargando juegos...</div>;
    }

    if (error) {
        return <div className="text-center my-5">Error: {error}</div>;
    }

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
                                <CardGame game={game} />
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