import React, { useState, useEffect } from 'react';
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
          const user = res.data.find(user => user.username === profileData.username && user.password === profileData.password);
          if (user) {
            navigate("/questionnaire");
          } else {
            alert("Please try again. Username or Password is incorrect.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Please try again. Username or Password is incorrect.");
        });
    }
    else if (e.nativeEvent.submitter.id === "signup") {
      axios
        .get("http://localhost:8000/users/")
        .then((res) => {
          console.log(res)
          const user = res.data.find(user => user.username === profileData.username);
          if (user) {
            alert("This username is already taken. Please try another.");
          } else {
            axios
              .post("http://localhost:8000/users/", profileData)
              .then((res) => {
                let token = res.data;
                localStorage.setItem("jwt", token);
                console.log(res)
                navigate("/questionnaire");
              });
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
          <FloatingLabel className="mb-3 input-box">
            <Form.Control
              id="username"
              type="text"
              placeholder="Username"
              onChange={handleProfileChange}
            />
          </FloatingLabel>
          <FloatingLabel className='input-box'>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              onChange={handleProfileChange}
            />
          </FloatingLabel>
          <Button
            id="login"
            className="btn"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          &emsp;or&emsp;
          <Button
            id="signup"
            className="btn"
            variant="primary"
            type="submit">
            Signup
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Home;
