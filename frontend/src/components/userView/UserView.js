
import { Navbar, Nav, Button } from 'react-bootstrap';
import { logout, UserId } from '../../util/authProvider'
import {
    Link,
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { RestaurantTable } from './restaurant/RestaurantTable';
import { JsonTable} from "./../json/JsonTable";


export default function UserView() {

    return (

        <Router>

            <div className="AdminView">
                <Navbar bg="dark" variant="dark">
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/restaurant">Restauracje</Nav.Link>
                        <Nav.Link as={Link} to="/orders">Zamówienia</Nav.Link>
                    </Nav>
                    <Button variant="danger" onClick={logout}>Wyloguj</Button>
                </Navbar>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/restaurant" />
                    </Route>
                    <Route path="/restaurant">
                        <RestaurantTable />
                    </Route>
                    <Route path="/orders">
                        <JsonTable url={`/api/report/order_all_data/user/${UserId.getUserId()}`} />
                    </Route>

                </Switch>
            </div>
        </Router>
    )
}
