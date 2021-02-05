import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { Alert } from 'react-bootstrap';

const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 4000,
    offset: '30px',
    transition: transitions.FADE
  }

  const AlertTemplate = ({ style, options, message, close }) => {

    if(options.type === 'info')
      return (
        <Alert key={Math.random()} variant="primary">
            {message}
        </Alert>
        )
    if(options.type === 'success')
        return (
          <Alert key={Math.random()} variant="success">
              {message}
          </Alert>
          )
    if(options.type === 'error')
        return (
        <Alert key={Math.random()} variant="danger">
            {message}
        </Alert>
        )
    }
ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
