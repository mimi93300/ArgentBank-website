
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';


//Redux
import store from './store/index.js';
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  /* utilisation du Provider pour rendre le store Redux disponible pour tous les composants de l'application */
  <Provider store={store}>
    <App />
  </Provider>//pour stocker le store
);
