import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/styles/reset.css"
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ModalProvider } from './Context/Modal';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';

let store = configureStore({});

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);