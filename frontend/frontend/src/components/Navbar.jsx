// NavbarComponent.js
import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import AuthContext from '../auth/authContext';

const NavbarComponent = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">ProductApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto justify-content-center" style={{ width: '100%' }}>
          <Nav.Link as={Link} to="/category/men's clothing">Men</Nav.Link>
          <Nav.Link as={Link} to="/category/women's clothing">Women</Nav.Link>
          <Nav.Link as={Link} to="/category/electronics">Electronics</Nav.Link>
          <Nav.Link as={Link} to="/category/jewellery">Jewellery</Nav.Link>
        </Nav>
        <Nav>
          {isLoggedIn && user ? (
            <>
              <Nav.Link>{user.username}</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
          <Nav.Link as={Link} to="/register">Signup</Nav.Link>

          <Nav.Link as={Link} to="/cart">
            <FaShoppingCart size={40} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
