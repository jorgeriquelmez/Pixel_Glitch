import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./context/CartContext.jsx";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ExplorerPage from "./components/ExplorerPage";
import GenrePage from "./components/GenrePage";
import GamesDisplay from "./components/GamesDisplay";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPage from "./components/AdminPage";
import CheckoutPage from "./components/CheckoutPage";
import Reviews from "./components/ReviewPage";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 importar

import "./App.css";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AuthProvider>
          <CartProvider>
            <div className="d-flex flex-column min-vh-100">
              <Header />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<ExplorerPage />} />
                  <Route path="/top-ventas" element={<GamesDisplay />} />
                  <Route path="/genre/:category" element={<GenrePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<AdminPage />} />

                  {/* 🔐 Rutas protegidas */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="/review/:id" element={<Reviews />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </Router>
    </AppProvider>
  );
};

export default App;
