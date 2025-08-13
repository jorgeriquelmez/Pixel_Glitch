CREATE DATABASE Pixel_Glitch;

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    platforms TEXT[], 
    price NUMERIC(5, 2) NOT NULL,
    image VARCHAR(255),
    genre TEXT[], 
    release_date DATE,
    popularity NUMERIC(3, 1)
);

INSERT INTO games (id, title, platforms, price, image, genre, release_date, popularity)
VALUES
(1, 'Cyberpunk 2077', ARRAY['PC', 'PS5', 'Xbox Series X/S'], 59.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/ciberpunk.jpg', 'RPG', '2020-12-10', 8.5),
(2, 'The Witcher 3: Wild Hunt', ARRAY['PC', 'PS4', 'Xbox One', 'Switch'], 39.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/witcher.jpeg', 'RPG', '2015-05-19', 9.8),
(3, 'Red Dead Redemption 2', ARRAY['PC', 'PS4', 'Xbox One'], 49.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/juego3.jpeg', 'Aventura', '2018-10-26', 9.6),
(4, 'Grand Theft Auto V', ARRAY['PC', 'PS4', 'Xbox One'], 19.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/gta.jpeg', 'Acción', '2013-09-17', 9.7),
(5, 'Assassin''s Creed Valhalla', ARRAY['PC', 'PS4', 'PS5', 'Xbox Series X/S', 'Xbox One'], 29.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/assessin.jpeg', 'RPG', '2020-11-10', 8.1),
(6, 'Far Cry 6', ARRAY['PC', 'PS5', 'PS4', 'Xbox Series X/S', 'Xbox One'], 29.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/farcry.jpeg', 'Acción', '2021-10-07', 7.8),
(7, 'Call of Duty: Modern Warfare', ARRAY['PC', 'PS4', 'Xbox One', 'Xbox Series X/S'], 59.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/callduty.jpg', 'Acción', '2019-10-25', 9.0),
(8, 'Battlefield 2042', ARRAY['PC', 'PS4', 'PS5', 'Xbox Series X/S', 'Xbox One'], 29.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/battlefield.jpg', 'Acción', '2021-11-19', 6.0),
(10, 'FIFA 25', ARRAY['PC', 'PS4', 'PS5', 'Xbox Series X/S', 'Xbox One'], 59.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/fc25.jpg', 'Deportes', NULL, 10.0),
(11, 'NBA 2K23', ARRAY['PC', 'PS4', 'PS5', 'Xbox Series X/S', 'Xbox One'], 59.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnR-gt9AeX_FyZUq91lzhjF459hW6c45gJ8g&s', 'Deportes', '2022-09-09', 8.0),
(12, 'Madden NFL 23', ARRAY['PC', 'PS4', 'PS5', 'Xbox Series X/S', 'Xbox One'], 60.00, 'https://github.com/jorgeriquelmez/imagenes/blob/main/nfl23.jpg', 'Deportes', '2022-08-19', 9.0),
(13, 'The Last of Us Part I', ARRAY['PC', 'PS5'], 69.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/lou.jpg', 'Acción', '2023-03-28', 9.5),
(14, 'Elden Ring', ARRAY['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series X/S'], 59.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/elder.jpg', 'RPG', '2022-02-25', 9.8),
(15, 'Cyberpunk 2', ARRAY['PC', 'PS5', 'Xbox Series X/S'], 49.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/ciber2.jpg', 'RPG', '2025-12-10', 8.2),
(16, 'Final Fantasy XVI', ARRAY['PS5', 'PC'], 69.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/ff.jpeg', 'RPG', '2016-02-26', 9.4),
(17, 'Stardew Valley', ARRAY['PC', 'PS4', 'Xbox One', 'Nintendo Switch'], 14.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/stardew.jpeg', 'Simulador', '2016-02-26', 9.4),
(18, 'The Witcher 2: Assassins of Kings', ARRAY['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series X/S', 'Nintendo Switch'], 29.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/witcher2.jpeg', 'RPG', '2015-05-19', 9.7),
(19, 'Hades', ARRAY['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series X/S', 'Nintendo Switch'], 24.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/hades.jpeg', 'Acción', '2020-09-17', 9.1),
(20, 'Minecraft', ARRAY['PC', 'PS4', 'Xbox One', 'Nintendo Switch', 'Mobile'], 26.95, 'https://github.com/jorgeriquelmez/imagenes/blob/main/minecraft.jpeg', 'Simulador', '2011-11-18', 10.0),
(21, 'God of War Ragnarök', ARRAY['PS4', 'PS5'], 69.99, 'https://github.com/jorgeriquelmez/imagenes/blob/main/GOW.jpeg', 'Acción', '2022-11-09', 9.6),
(22, 'Hollow Knight', ARRAY['PC', 'PS4', 'Xbox One', 'Nintendo Switch'], 14.99, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg?t=1695270428', 'Aventura', '2017-02-24', 9.3);