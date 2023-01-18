import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Home = () => {
    return (
      <div className="home-page">
        <Container className="mt-5 text-center">
          <h1 className="display-4">Welcome to First Jobber Choice</h1>
        </Container>
      </div>
    );
  };

export default Home;
