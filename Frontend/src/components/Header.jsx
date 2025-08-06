import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'; // Asegúrate de que esta ruta sea correcta
import './Header.css';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Pixel Glitch Logo"
          />
          <span className="ms-2">Pixel Glitch</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/explorador">Categorías</Nav.Link>
            <Nav.Link href="/top-ventas">Top ventas</Nav.Link>
            <Nav.Link href="/login">Iniciar sesión</Nav.Link>
          </Nav>
          <Form className="d-flex me-3">
            <div className="input-group">
              <Button variant="dark" className="border-end-0">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              <FormControl
                type="search"
                placeholder="Buscar"
                className="bg-transparent text-white border-start-0"
                aria-label="Buscar"
              />
            </div>
          </Form>
          <Button variant="dark">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;