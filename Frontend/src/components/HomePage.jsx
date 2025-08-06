import React, { useState, useEffect } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import data from '../data/data.json';
import './HomePage.css';

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(data.images);
  }, []);

  return (
    <div className="homepage-container">
      <Container>
        <h1 className="text-center my-4">¡Bienvenidos a Pixel Glitch!</h1>
        <Carousel>
          {images.map((image) => (
            <Carousel.Item key={image.id}>
              <img
                className="d-block w-100"
                src={image.url}
                alt={image.comment}
              />
              <Carousel.Caption>
                <p>{image.comment}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default HomePage;