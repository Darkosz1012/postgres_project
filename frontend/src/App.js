import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {useAuth, Role, logout} from './util/authProvider'
import { Button } from 'react-bootstrap';

import LoginView from './components/login/LoginView';
import AdminView from './components/adminView/AdminView';


function App() {
    const [logged] = useAuth();


    return (
        <div className="wrapper">
            {!logged && <>
                <LoginView />
            </>}
            {logged && Role.getRole()!=="admin" && <>
                user 
                <Button onClick={logout}>Wyloguj</Button>
            </>}
            {logged && Role.getRole()==="admin" && <>
                <AdminView/>
                
            </>}
        </div>
    );
}

export default App;