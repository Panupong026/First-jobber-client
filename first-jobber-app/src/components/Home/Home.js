import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Home = () => {
    return (
      <div className="home-page">
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand>First Jobber Choice</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/signup" className="mr-3">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/login" className="mr-3">Log In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container className="mt-5">
        <h1 className="display-4 text-center">Welcome to First Jobber Choice</h1>
        </Container>
      </div>
    );
  };

export default Home;
