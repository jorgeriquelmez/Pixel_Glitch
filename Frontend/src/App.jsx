import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './components/AuthContext';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ExplorerPage from './components/ExplorerPage'; 
import GamesDisplay from './components/GamesDisplay';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './components/AdminPage';
import CheckoutPage from './components/CheckoutPage';
import Reviews from './components/ReviewPage';
import Cart from './components/Cart';
import './App.css';

const App = () => {
    return (
        <AppProvider> 
            <Router>
                <AuthProvider>
                    <div className="d-flex flex-column min-vh-100">
                        <Header />
                        <main className="flex-grow-1">
                            <Routes>
                                <Route path="/" element={<ExplorerPage />} />
                                <Route path="/top-ventas" element={<GamesDisplay />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/admin" element={<AdminPage />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/ReviewPage" element={<Reviews />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </AuthProvider>
            </Router>
        </AppProvider>
    );
};

export default App;