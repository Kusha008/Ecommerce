import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage,VerifyPage,HomePage } from './Routes.js';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/verify' element={<VerifyPage/>} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
