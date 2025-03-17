import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './Redux/store'

import { BrowserRouter } from 'react-router-dom';
import { FormProvider } from './components/FormContent';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
      <FormProvider>
        <App />
        </FormProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
