-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 11, 2023 at 02:00 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyecto_final`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buy_tikets` (IN `p_usuario_id` INT, IN `p_pelicula_id` INT, IN `p_cantidad` INT)   BEGIN
    INSERT INTO compras (usuario_id, pelicula_id, cantidad) VALUES (p_usuario_id, p_pelicula_id, p_cantidad);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_movies` ()   BEGIN
    SELECT * FROM peliculas;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_user_buy_history` (IN `p_usuario_id` INT)   BEGIN
    SELECT peliculas.titulo, compras.cantidad, compras.fecha_compra
    FROM compras
    JOIN peliculas ON compras.pelicula_id = peliculas.id
    WHERE compras.usuario_id = p_usuario_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_login_user` (IN `p_correo` VARCHAR(300), IN `p_contrasena` VARCHAR(500))   BEGIN
    SELECT nombre,rol_id FROM usuarios WHERE p_correo = usuarios.correo AND p_contrasena = usuarios.contrasena ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_new_user` (IN `p_nombre` VARCHAR(300), IN `p_correo` VARCHAR(250), IN `p_contrasena` TEXT, IN `rol_id` INT)   BEGIN
    INSERT INTO usuarios (nombre, correo, contrasena,rol_id) VALUES (p_nombre, p_correo, p_contrasena,rol_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_user_profile` (IN `p_usuario_id` INT, IN `p_nuevo_nombre` VARCHAR(50), IN `p_nuevo_correo` VARCHAR(50), IN `p_nueva_contrasena` VARCHAR(50))   BEGIN
    UPDATE usuarios
    SET nombre = p_nuevo_nombre, correo = p_nuevo_correo, contrasena = p_nueva_contrasena
    WHERE id = p_usuario_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `pelicula_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha_compra` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `peliculas`
--

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text,
  `precio_boleto` float DEFAULT NULL,
  `clasificacion` varchar(255) DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `fecha_estreno` date DEFAULT NULL,
  `url_imagen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `peliculas`
--

INSERT INTO `peliculas` (`id`, `titulo`, `descripcion`, `precio_boleto`, `clasificacion`, `genero`, `fecha_estreno`, `url_imagen`) VALUES
(1, 'El Viaje del León', 'Una emocionante aventura que sigue la travesía de un león en busca de su hogar perdido.', 10.99, 'Apta para todo público', 'Aventura', '2023-01-15', 'imagen1.jpg'),
(2, 'El Secreto de la Isla', 'Un misterioso secreto aguarda en una isla desierta. Un grupo de exploradores se aventura a descubrir la verdad.', 12.99, 'Recomendada para mayores de 12 años', 'Misterio', '2023-02-20', 'imagen2.jpg'),
(3, 'Amor en París', 'Una romántica historia que se desarrolla en las hermosas calles de París, explorando el poder del amor verdadero.', 8.99, 'Apta para todo público', 'Romance', '2023-03-10', 'imagen3.jpg'),
(4, 'Aventuras en el Espacio', 'Únete a la tripulación de la nave estelar en una emocionante misión por el universo. Acción y ciencia ficción te esperan.', 15.99, 'Recomendada para mayores de 16 años', 'Ciencia Ficción', '2023-04-25', 'imagen4.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'SuperUsuario'),
(2, 'Administrador'),
(3, 'Cliente');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(500) NOT NULL,
  `rol_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasena`, `rol_id`) VALUES
(1, 'DEIBY TEST API', 'test@tester.com', '3ea040427643a1960b0a7afd1a186974', 1),
(15, 'JOHN', 'sample@tester.com', '3ea040427643a1960b0a7afd1a186974', 1),
(16, 'JOHN', 'sample2@tester.com', '3ea040427643a1960b0a7afd1a186974', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `pelicula_id` (`pelicula_id`);

--
-- Indexes for table `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`pelicula_id`) REFERENCES `peliculas` (`id`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
