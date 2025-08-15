import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'; // Asegúrate de que esta ruta sea correcta
import './Header.css';

const Header = () => {
  return (
    <Navbar variant="dark" expand="lg" className="bg-custom-color py-3" style={{ borderBottom: '1px solid #e5e8eb' }}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="140"
            height="35"
            className="d-inline-block align-top"
            alt="Pixel Glitch Logo"
          />
          {/* <span className="ms-2">Pixel Glitch</span> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/top-ventas">Sala de ventas</Nav.Link>
            <Nav.Link href="/login">Iniciar sesión</Nav.Link>
            {/* <Nav.Link href="/register">registrarse</Nav.Link> */}
            <Nav.Link href="/admin">Administrador</Nav.Link>
            <Nav.Link href="/checkout">Checkout</Nav.Link>
            <Nav.Link href="/ReviewPage">Reseñas</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">

            <Link to="/cart" className="shopping-cart-container">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;