import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gufi from './Gufi';
import Page from './Page';
import Profile from './pages/Profile';
import { ThemeProvider } from './Context';
import Uname from './Uname';
import Test from './Test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <Page />
  </ThemeProvider>,
);

