import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importer le Provider et le store
import { Provider } from 'react-redux';
import store from './store';  // Assurez-vous que le chemin vers votre store est correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Envelopper App avec le Provider et lui passer le store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Mesurer les performances
reportWebVitals();
