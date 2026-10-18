import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './landing_page/home/HomePage.jsx';

import SignUpPage from './landing_page/signup/Signup.jsx';
import LoginPage from './landing_page/login/Login.jsx';
import AboutPage from './landing_page/about/Aboutpage.jsx';
import ProductPage from './landing_page/products/ProductPage.jsx';
import PricingPage from './landing_page/pricing/PricingPage.jsx';
import SupportPage from './landing_page/support/SupportPage.jsx';
import NotFound from './landing_page/NotFound.jsx';
import Navbar from './landing_page/Navbar.jsx';
import Footer from './landing_page/Footer.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);