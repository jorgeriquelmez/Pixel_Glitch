import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { useAuth } from '../components/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar variant="dark" expand="lg" className="bg-custom-color py-3" style={{ borderBottom: '1px solid #e5e8eb' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="140"
            height="35"
            className="d-inline-block align-top"
            alt="Pixel Glitch Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/top-ventas">Sala de ventas</Nav.Link>
            {/* <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/ReviewPage">Reseñas</Nav.Link> */}
          </Nav>
                    <div className="d-flex align-items-center">
                        <div className='sesion-links'>
                            {!user && (
                                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                            )}
                            {user && (
                                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
                            )}
                            {user?.email === 'admin@pixelglitch.com' && (
                                <Nav.Link as={Link} to="/admin" style={{ fontWeight: 'bold', color: 'darkgrey' }}>
                                  Administrador
                                </Nav.Link>
                              )}
                            </div>
                        <Link to="/cart" className="shopping-cart-container ms-3">
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        </Link>
                    </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;