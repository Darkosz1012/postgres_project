import React from 'react';
import { Navbar,  Nav ,Button} from 'react-bootstrap';
import {logout} from '../../util/authProvider'
import {
    Link,
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import {UserTable} from './user/UserTable';

export default function AdminView() {
    return (
        
        <Router>
           
        <div className="AdminView">
            <Navbar  bg="dark" variant="dark">
                {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/user">Użytkownicy</Nav.Link>
                    <Nav.Link as={Link} to="/restourant">Restouracje</Nav.Link>
                    <Nav.Link as={Link} to="/order">Zamównienia</Nav.Link>
                    <Nav.Link as={Link} to="/review">Recenzje</Nav.Link>
                    <Nav.Link as={Link} to="/status">Status</Nav.Link>
                    <Nav.Link as={Link} to="/product">Produkty</Nav.Link>
                    <Nav.Link as={Link} to="/ingredient">Składniki</Nav.Link>
                </Nav>
                <Button variant="danger" onClick={logout}>Wyloguj</Button>
            </Navbar>
            <Switch>
            <Route exact path="/">
                <Redirect to="/user" />
            </Route>
                <Route path="/user">
                    <UserTable />
                </Route>
                <Route path="/restourant">
                    restourant
                </Route>
                <Route path="/order">
                    order
                </Route>
                <Route path="/review">
                review
                </Route>
                <Route path="/status">
                status
                </Route>
                <Route path="/product">
                product
                </Route>
                <Route path="/ingredient">
                ingredient
                </Route>
                </Switch>
        </div>
        </Router>
    )
}
