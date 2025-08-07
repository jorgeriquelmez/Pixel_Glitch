import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer-bg text-white mt-5 p-4 text-center" style={{ borderTop: '1px solid #e5e8eb' }}>
      <Container>
        <Row className="mb-3">
          <Col>
            <a href="#" className="text-white mx-2">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="#" className="text-white mx-2">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="#" className="text-white mx-2">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="mb-0">@2025 Pixel Glitch. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;