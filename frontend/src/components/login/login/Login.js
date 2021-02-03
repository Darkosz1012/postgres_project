import React, { useState } from 'react';
import { login, Role } from "../../../util/authProvider";
import { Form , Button } from 'react-bootstrap';
import { decodeToken } from "react-jwt";

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(r => r.json())
            .then(({ token }) => {
                Role.setRole(decodeToken(token.accessToken).role)
                login(token)
            });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group >
                <Form.Label>Nazwa użytkownika: </Form.Label>
                <Form.Control type="text" placeholder="Nazwa użytkownika" onChange={e => setUserName(e.target.value)} />
                
            </Form.Group>

            <Form.Group >
                <Form.Label>Hasło: </Form.Label>
                <Form.Control type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Zaloguj się
            </Button>
        </Form>
    )
}

