import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, VerifyPage, HomePage, CartPage } from './Routes.js';
import ProductPage from './components/Product/ProductPage.jsx';
import CategoryPage from './components/Category/CategoryPage.jsx';
import useInitializeUser from './hooks/useInitializeUser.jsx';
import LoginSeller from './components/../sellerPages/LoginSeller.jsx';
import RegisterSeller from './components/../sellerPages/RegisterSeller.jsx';
import VerifySeller from './components/../sellerPages/VerifySeller.jsx';
import SellerDashboard from './components/../sellerPages/SellerDashboard.jsx';
import UserDetails from './pages/UserDetails.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';

import AdminPage from './components/Admin/AdminPage.jsx';
import './App.css';
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import SearchResults from './pages/SearchResults.jsx';
// import PaymentSuccess from './pages/PaymentSuccess.jsx';
// import PaymentFailure from './pages/PaymentFailure.jsx';

import { useLocation } from 'react-router-dom';
function Layout({ children }) {
  const location = useLocation();
  const noHeaderFooterPaths = ['/seller/login', '/seller/register', '/seller/verify', '/seller/dashboard'];

  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

function App() {
  useInitializeUser();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<UserDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/order-confirmation" element={<OrderConfirmation/>} />
            {/* <Route path="/payment-success" element={<PaymentSuccess/>} />
            <Route path="/payment-failure" element={<PaymentFailure/>} /> */}

            {/* Seller Pages */}
            <Route path="/seller/login" element={<LoginSeller />} />
            <Route path="/seller/register" element={<RegisterSeller />} />
            <Route path="/seller/verify" element={<VerifySeller />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />

            {/* Admin Page */}
            <Route path="/admin" element={<AdminPage />} />

          </Routes>
        </Layout>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}

export default App;
