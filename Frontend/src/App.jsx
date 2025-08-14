import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ExplorerPage from './components/ExplorerPage';
import GenrePage from './components/GenrePage';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './components/AdminPage';
import CheckoutPage from './components/CheckoutPage';
import GamesDisplay from './components/GamesDisplay';
import Reviews from './components/ReviewPage'
import Cart from './components/Cart'
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<ExplorerPage />} />
            <Route path="/genre/:genreName" element={<GenrePage />} />
            <Route path="/top-ventas" element={<GamesDisplay />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/ReviewPage" element={<Reviews />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
