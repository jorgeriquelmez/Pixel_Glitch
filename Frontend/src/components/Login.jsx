import React from 'react'
import './login.css'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>

      <main >
       <h2 className='text-center text-white mt-5 mb-4'>Iniciar sesión</h2>
        <form action="" className='d-flex flex-column align-items-center'>
            <input type="text" className='form-control w-100' placeholder='Correo'/>
            <input type="text" className='form-control mt-5' placeholder='Contraseña'/>
            <button type="submit" className='btn btn-primary mt-5 rounded-pill boton'>Iniciar sesión</button>
        </form>
        <p className='text-center text-white mt-5'>No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </main>
    </div>
  )
}

export default Login
