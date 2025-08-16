CREATE DATABASE Pixel_Glitch;

CREATE TABLE games (
    id INT PRIMARY KEY,
    title TEXT NOT NULL,
    platforms TEXT,
    price NUMERIC(10, 2),
    image TEXT,
    genre TEXT,
    release_date DATE,
    popularity NUMERIC(3, 1)
);

INSERT INTO games (id, title, platforms, price, image, genre, release_date, popularity) VALUES
(1, 'Cyberpunk 2077', 'PC, PS5, Xbox Series X/S', 59.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/ciberpunk.jpg', 'RPG', '2020-12-10', 8.5),
(2, 'The Witcher 3: Wild Hunt', 'PC, PS4, Xbox One, Switch', 39.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/witcher.jpeg', 'RPG', '2015-05-19', 9.8),
(3, 'Red Dead Redemption 2', 'PC, PS4, Xbox One', 49.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/juego3.jpeg', 'Aventura', '2018-10-26', 9.6),
(4, 'Grand Theft Auto V', 'PC, PS4, Xbox One', 19.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/gta.jpeg', 'Acción', '2013-09-17', 9.7),
(5, 'Assassin''s Creed Valhalla', 'PC, PS4, PS5, Xbox Series X/S, Xbox One', 29.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/assessin.jpeg', 'RPG', '2020-11-10', 8.1),
(6, 'Far Cry 6', 'PC, PS5, PS4, Xbox Series X/S, Xbox One', 29.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/farcry.jpeg', 'Acción', '2021-10-07', 7.8),
(7, 'Call of Duty: Modern Warfare', 'PC, PS4, Xbox One, Xbox Series X/S', 59.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/callduty.jpg', 'Acción', '2019-10-25', 9.0),
(8, 'Battlefield 2042', 'PC, PS4, PS5, Xbox Series X/S, Xbox One', 29.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/battlefield.jpg', 'Acción', '2021-11-19', 6.0),
(10, 'FIFA 25', 'PC, PS4, PS5, Xbox Series X/S, Xbox One', 59.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/fc25.jpg', 'Deportes', '2024-10-07', 10.0),
(11, 'NBA 2K23', 'PC, PS4, PS5, Xbox Series X/S, Xbox One', 59.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnR-gt9AeX_FyZUq91lzhjF459hW6c45gJ8g&s', 'Deportes', '2022-09-07', 8.0),
(12, 'Madden NFL 23', 'PC, PS4, PS5, Xbox Series X/S, Xbox One', 60.00, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/nfl23.jpg', 'Deportes', '2022-08-19', 9.0),
(13, 'The Last of Us Part I', 'PC, PS5', 69.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/lou.jpg', 'Acción', '2023-03-28', 9.5),
(14, 'Elden Ring', 'PC, PS4, PS5, Xbox One, Xbox Series X/S', 59.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/elder.jpg', 'RPG', '2022-02-25', 9.8),
(15, 'Cyberpunk 2', 'PC, PS5, Xbox Series X/S', 49.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/ciber2.jpg', 'RPG', '2025-12-10', 8.2),
(16, 'Final Fantasy XVI', 'PS5, PC', 69.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/ff.jpeg', 'RPG', '2016-02-26', 9.4),
(17, 'Stardew Valley', 'PC, PS4, Xbox One, Nintendo Switch', 14.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/stardew.jpeg', 'Simulador', '2016-02-26', 9.4),
(18, 'The Witcher 2: Assassins of Kings', 'PC, PS4, PS5, Xbox One, Xbox Series X/S, Nintendo Switch', 29.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/witcher2.jpeg', 'RPG', '2015-05-19', 9.7),
(19, 'Hades', 'PC, PS4, PS5, Xbox One, Xbox Series X/S, Nintendo Switch', 24.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/hades.jpeg', 'Acción', '2020-09-17', 9.1),
(20, 'Minecraft', 'PC, PS4, Xbox One, Nintendo Switch, Mobile', 26.95, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/minecraft.jpeg', 'Simulador', '2011-11-18', 10.0),
(21, 'God of War Ragnarök', 'PS4, PS5', 69.99, 'https://raw.githubusercontent.com/jorgeriquelmez/imagenes/refs/heads/main/GOW.jpeg', 'Acción', '2022-11-09', 9.6),
(22, 'Hollow Knight', 'PC, PS4, Xbox One, Nintendo Switch', 14.99, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg?t=1695270428', 'Aventura', '2017-02-24', 9.3);



--tabla para login 

CREATE TABLE users (


    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 

);
-- Datos iniciales (contraseñas: pixel1, pixel2, pixel3, pixel4)

INSERT INTO users (email, password) VALUES
('admin@pixelglitch.com', '$2b$12$24eoPx6nbQYiF8WyrpsJneL/vmlp6o.R.6qrnLm04c/lftnk5wyBm'), --pixel1
('jorge@pixelglitch.com', '$2b$12$BPpYeBZKqGMcJ5QYGSTV2OztfwoivnxFnZ8HwHB8PiazIme/ZoFv2'), --pixel2
('lucas@pixelglitch.com', '$2b$12$8BAAB6edGNHHgVB/ELOEpOAWXx13wptAceFPspM0LOU.OhETpnWyu'), --pixel3
('zamora@pixelglitch.com', '$2b$12$Hc8Ke.O.CXmlqIDLzBWU4eSq6rvAveCiS/fdxruav58d7fS4J3QzO'); --pixel4

--tabla para checkout

CREATE TABLE checkout (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  nombre TEXT NOT NULL,
  direccion TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  codigo_postal TEXT NOT NULL,
  telefono TEXT NOT NULL,
  tarjeta TEXT NOT NULL,
  expiracion TEXT NOT NULL,
  cvv TEXT NOT NULL
);
