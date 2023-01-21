import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Header.css'
import logo from '../../image/logo.jpg'

const Header = () => {
  return (
    <Navbar className="navbar" bg="light" expand="lg" fixed="top">
      <Container>
        <Image className="logo" src={logo} alt='First Jobber Choice' />
        <Navbar.Collapse className="navbar-nav" id="basic-navbar-nav">
          <Nav className="ml-auto normal-link">
            <Nav.Link as={Link} to="/" className="mr-3 nav-item">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
