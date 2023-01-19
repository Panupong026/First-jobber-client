import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const handleProfileChange = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.id === "login") {
      axios
        .get("http://localhost:8000/users/")
        .then((res) => {
          console.log(res)
          navigate("/questionare");
        })
        .catch((err) => {
          console.log(err);
          alert("Please try again. Username or Password is incorrect.");
        });
    } else if (e.nativeEvent.submitter.id === "signup") {
      axios
        .post("http://localhost:8000/users/", profileData)
        .then((res) => {
          if (res.data.name === "SequelizeUniqueConstraintError") {
            alert("This username is already taken. Please try another.");
          } else {
            let token = res.data;
            localStorage.setItem("jwt", token);
            navigate("/update-info");
          }
        });
    }
  };

  return (
    <Row className="home">
      <Col sm>
        <Col className="title">Welcome to First Jobber Choice</Col>
        <br />
      </Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel label="Username" className="mb-3">
            <Form.Control
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleProfileChange}
            />
          </FloatingLabel>
          <FloatingLabel label="Password">
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              onChange={handleProfileChange}
            />
          </FloatingLabel>
          <Button
            id="login"
            className="login-btn"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          &emsp;or&emsp;
          <Button id="signup" variant="primary" type="submit">
            Signup
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Home;
