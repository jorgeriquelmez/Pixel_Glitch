import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import usersData from '../data/acceso.json';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    const foundUser = usersData.find(user => user.email === email && user.password === password);

    if (foundUser) {
      login(foundUser.role);
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <main>
        <h2 className='text-center text-white mt-5 mb-4'>Iniciar sesión</h2>
        <form onSubmit={handleLogin} className='d-flex flex-column align-items-center'>
          <input
            type="email"
            className='form-control w-100'
            placeholder='Correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className='form-control mt-5'
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className='btn btn-primary mt-5 rounded-pill boton'>Iniciar sesión</button>
        </form>
        <p className='text-center text-white mt-5'>No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </main>
    </div>
  );
};

export default Login;