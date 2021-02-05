import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { logout } from '../../util/authProvider'
import {
    Link,
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { UserTable } from './user/UserTable';
import { RestaurantTable } from './restaurant/RestaurantTable';
import { StatusTable } from './status/StatusTable';
import { ProductTable } from './product/ProductTable';
import { ReviewTable } from './review/ReviewTable';
import { IngredientTable } from './ingredient/IngredientTable';
import { OrderTable } from './order/OrderTable';
import { ProductIngredientTable } from './productIngredient/ProductIngredientTable';
import { OrderProductTable } from './orderProduct/OrderProductTable';
import { UserRestaurantTable } from './userRestaurant/UserRestaurantTable';

import { JsonTable} from "./../json/JsonTable";

export default function AdminView() {
    return (

        <Router>
            <div className="AdminView">
                <Navbar bg="dark" variant="dark">
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/user">Użytkownicy</Nav.Link>
                        <Nav.Link as={Link} to="/restaurant">Restauracje</Nav.Link>
                        <Nav.Link as={Link} to="/order">Zamównienia</Nav.Link>
                        <Nav.Link as={Link} to="/review">Recenzje</Nav.Link>
                        <Nav.Link as={Link} to="/status">Status</Nav.Link>
                        <Nav.Link as={Link} to="/product">Produkty</Nav.Link>
                        <Nav.Link as={Link} to="/ingredient">Składniki</Nav.Link>
                        <Nav.Link as={Link} to="/order_product">Zamówienie-Produkt</Nav.Link>
                        <Nav.Link as={Link} to="/user_restaurant">Użytkownik-Restauracja</Nav.Link>
                        <Nav.Link as={Link} to="/product_ingredient">Produkt-Skaładnik</Nav.Link>
                        <Nav.Link as={Link} to="/r1">R1</Nav.Link>
                        <Nav.Link as={Link} to="/r2">R2</Nav.Link>
                        <Nav.Link as={Link} to="/r3">R3</Nav.Link>
                        <Nav.Link as={Link} to="/r4">R4</Nav.Link>
                        <Nav.Link as={Link} to="/r5">R5</Nav.Link>
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
                   
                    <Route path="/restaurant">
                        <RestaurantTable />
                    </Route>
                    <Route path="/order">
                        <OrderTable />
                    </Route>
                    <Route path="/review">
                        <ReviewTable />
                    </Route>
                    <Route path="/status">
                        <StatusTable />
                    </Route>
                    <Route path="/product">
                        <ProductTable />
                    </Route>
                    <Route path="/ingredient">
                        <IngredientTable />
                    </Route>
                    <Route path="/order_product">
                        <OrderProductTable />
                    </Route>
                    <Route path="/user_restaurant">
                        <UserRestaurantTable />
                    </Route>
                    <Route path="/product_ingredient">
                        <ProductIngredientTable />
                    </Route>
                    <Route path="/r1">
                        <h1>Dokładniesze dane zamówień</h1>
                        <JsonTable url={`/api/report/order_all_data`} />
                    </Route>
                    <Route path="/r2">
                        <h1>Składniki w produktach</h1>
                        <JsonTable url={`/api/report/product_ingredient`} />
                    </Route>
                    <Route path="/r3">
                        <h1>Średnia ocena restauracji</h1>
                        <JsonTable url={`/api/report/restaurant_rating`} />
                    </Route>
                    <Route path="/r4">
                        <h1>Właściciele restauracji</h1>
                        <JsonTable url={`/api/report/user_restaurant`} />
                    </Route>
                    <Route path="/r5">
                        <h1>Przychód restauracji restauracji</h1>
                        <JsonTable url={`/api/report/restaurant_income`} />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
