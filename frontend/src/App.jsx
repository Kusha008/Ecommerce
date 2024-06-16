import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage,VerifyPage,HomePage,ProfilePage,CartPage } from './Routes.js';
import ProductPage from './components/Product/ProductPage.jsx';
import CategoryPage from './components/Category/CategoryPage.jsx';
import useInitializeUser from './hooks/useInitializeUser.jsx';


import './App.css';
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import SearchResults from './pages/SearchResults.jsx';

function App() {
  useInitializeUser();
  
  return (
      <Router>
        <Header/>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/verify" element={<VerifyPage/>}/>
          <Route path="/" element ={<HomePage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:productId" element={<ProductPage/>}/>
          <Route path="/category/:categoryId" element={<CategoryPage/>}/>
          <Route path="/search" element={<SearchResults/>}/>
        </Routes>
        <Footer/>
      </Router>
)
}

export default App;
