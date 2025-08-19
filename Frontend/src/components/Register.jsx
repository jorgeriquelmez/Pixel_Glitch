import React, { useState } from "react";
import "./login.css";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrar");
        return;
      }

      alert("Usuario creado con éxito ✅");
      console.log(data);
    } catch (err) {
      console.error("Error:", err);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div>
      <main>
        <h2 className="text-center text-white mt-5 mb-4">Registrate</h2>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center"
        >
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control w-100"
            placeholder="Correo"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control mt-5"
            placeholder="Contraseña"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="form-control mt-5"
            placeholder="Repetir Contraseña"
          />
          <button
            type="submit"
            className="btn btn-primary mt-5 rounded-pill boton"
          >
            Crear cuenta
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
