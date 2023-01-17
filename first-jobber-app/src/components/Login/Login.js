import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic here (e.g. sending a request to a server)
        console.log(username, password);
    }

    return (
        <div className="login-page">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" 
                    value={username} onChange={(e) => setUsername(e.target.value)}  required />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
        </div>
    );
};

export default Login;
