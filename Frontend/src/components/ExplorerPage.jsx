import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import data from '../data/data.json';
import './ExplorerPage.css';

const ExplorerPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(data.images);
  }, []);

  return (
    <div className="explorer-container">
      <Container>
        <h1 className="text-center my-4">Explora nuestra galería</h1>
        <Row xs={1} md={2} lg={3} className="g-4">
          {images.map((image) => (
            <Col key={image.id}>
              <Card className="h-100">
                <Card.Img variant="top" src={image.url} alt={image.comment} />
                <Card.Body>
                  <Card.Text>{image.comment}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ExplorerPage;