import React from 'react'
import './login.css'

const Register = () => {
  return (
    <div>

      <main >
       <h2 className='text-center text-white mt-5 mb-4'>Registrate</h2>
        <form action="" className='d-flex flex-column align-items-center'>
            <input type="text" className='form-control w-100' placeholder='Correo'/>
            <input type="text" className='form-control mt-5' placeholder='Contraseña'/>
            <input type="text" className='form-control mt-5' placeholder='Repetir Contraseña'/>
            <button type="submit" className='btn btn-primary mt-5 rounded-pill boton'>Crear cuenta</button>
        </form>
      </main>
    </div>
  )
}

export default Register
