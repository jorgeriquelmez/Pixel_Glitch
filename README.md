#  Pixel Glitch – Tienda de Videojuegos

Pixel Glitch es una tienda online de videojuegos moderna, diseñada para ofrecer una experiencia fluida tanto a jugadores como administradores. El proyecto permite explorar el catálogo, filtrar juegos por categoría y precio, realizar compras y administrar los productos.

##  Tecnologías utilizadas

- **Backend**: Node.js, Express, PostgreSQL, Supabase  
- **Frontend**: HTML, CSS, JavaScript, Bootstrap, EJS  
- **Base de datos**: PostgreSQL

##  Instrucciones para ejecutar el proyecto

Clona este repositorio y ejecuta el servidor siguiendo estos pasos:

```bash
git clone https://github.com/jorgeriquelmez/Pixel_Glitch.git
cd pixel-glitch
npm install
```

Crea tu base de datos en PostgreSQL y ejecuta el script `backend/database/DDL.sql` para generar las tablas necesarias.

Luego levanta el servidor:

```bash
npm run dev
```

Accede a la app desde `http://localhost:3000`

##  Estructura del backend

```
backend/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   └── checkoutController.js
├── models/
│   └── checkoutModel.js
├── routes/
│   └── checkoutRoutes.js
├── database/
│   └── DDL.sql
```

##  Endpoints principales

- `GET /api/checkout` – Obtiene todas las compras.  
- `POST /api/checkout` – Registra una nueva compra.  
- `GET /users` – Lista todos los usuarios.

##  Estado del proyecto

Este repositorio forma parte del Hito 3 del desarrollo backend. El código se encuentra en etapa funcional, con modelos, rutas y controladores organizados para cumplir con los requisitos del desafío.


