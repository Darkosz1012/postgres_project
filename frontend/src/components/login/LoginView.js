import React from 'react';
import "./LoginView.scss";
import { Tabs, Tab } from 'react-bootstrap';
import Login from './login/Login';
import Signup from './signup/Signup';
export default function LoginView() {
	return (
		<div className="LoginView">
			<Tabs id="uncontrolled-tab-example" defaultActiveKey="login">
				<Tab eventKey="login" title="Zaloguj się">
					<div className="LoginView__container" >
						<Login/>
					</div>
				</Tab>
				<Tab eventKey="signup" title="Zarejestruj się">
					<div className="LoginView__container" >
						<Signup/>
					</div>
				</Tab>
			</Tabs>
		</div>
	)
}
