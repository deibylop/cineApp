-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 13, 2023 at 04:57 PM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteMovie` (IN `movieId` INT)   BEGIN
    DELETE FROM peliculas WHERE id = movieId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_asiento` (IN `p_asiento_id` INT)   BEGIN
    DELETE FROM asientos WHERE id = p_asiento_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_horario` (IN `p_horario_id` INT)   BEGIN
    DELETE FROM horarios WHERE id = p_horario_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_sala` (IN `p_sala_id` INT)   BEGIN
    DELETE FROM salas WHERE id = p_sala_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_asientos` ()   BEGIN
    SELECT * FROM asientos;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_generos` ()   BEGIN
  SELECT * FROM `generos_peliculas`;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_horarios` ()   BEGIN
    SELECT * FROM horarios;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_movies` ()   BEGIN
    SELECT * FROM peliculas;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_all_salas` ()   BEGIN
    SELECT * FROM salas;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertar_pelicula` (IN `p_titulo` VARCHAR(100), IN `p_descripcion` TEXT, IN `p_genero` VARCHAR(50), IN `p_fecha_estreno` DATE, IN `p_url_imagen` LONGTEXT)   BEGIN
  INSERT INTO peliculas (titulo, descripcion, genero, fecha_estreno, url_imagen)
  VALUES (p_titulo, p_descripcion, p_genero, p_fecha_estreno, p_url_imagen);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_asiento` (IN `p_sala_id` INT, IN `p_fila` INT, IN `p_columna` INT, IN `p_asignado` TINYINT)   BEGIN
    INSERT INTO asientos (sala_id, fila, columna, asignado) VALUES (p_sala_id, p_fila, p_columna, p_asignado);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_horario` (IN `p_sala_id` INT, IN `p_hora` TIME, IN `p_fecha` DATE)   BEGIN
    INSERT INTO horarios (sala_id, hora, fecha) VALUES (p_sala_id, p_hora, p_fecha);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_sala` (IN `p_nombre` VARCHAR(255), IN `p_capacidad` INT)   BEGIN
    INSERT INTO salas (nombre, capacidad) VALUES (p_nombre, p_capacidad);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_login_user` (IN `p_correo` VARCHAR(300), IN `p_contrasena` VARCHAR(500))   BEGIN
    SELECT rol_id FROM usuarios WHERE p_correo = usuarios.correo AND p_contrasena = usuarios.contrasena ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_new_user` (IN `p_nombre` VARCHAR(300), IN `p_correo` VARCHAR(250), IN `p_contrasena` TEXT, IN `rol_id` INT)   BEGIN
    INSERT INTO usuarios (nombre, correo, contrasena,rol_id) VALUES (p_nombre, p_correo, p_contrasena,rol_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UpdateMovie` (IN `movieId` INT, IN `newTitulo` VARCHAR(100), IN `newDescripcion` TEXT, IN `newGenero` VARCHAR(50), IN `newFechaEstreno` DATE, IN `newUrlImagen` LONGTEXT, IN `newStatus` INT)   BEGIN
    UPDATE peliculas
    SET
        titulo = newTitulo,
        descripcion = newDescripcion,
        genero = newGenero,
        fecha_estreno = newFechaEstreno,
        url_imagen = newUrlImagen,
        status = newStatus
    WHERE id = movieId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_asiento` (IN `p_asiento_id` INT, IN `p_nueva_fila` INT, IN `p_nueva_columna` INT, IN `p_nuevo_asignado` TINYINT)   BEGIN
    UPDATE asientos SET fila = p_nueva_fila, columna = p_nueva_columna, asignado = p_nuevo_asignado WHERE id = p_asiento_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_horario` (IN `p_horario_id` INT, IN `p_nueva_hora` TIME, IN `p_nueva_fecha` DATE)   BEGIN
    UPDATE horarios SET hora = p_nueva_hora, fecha = p_nueva_fecha WHERE id = p_horario_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_sala` (IN `p_sala_id` INT, IN `p_nuevo_nombre` VARCHAR(255), IN `p_nueva_capacidad` INT)   BEGIN
    UPDATE salas SET nombre = p_nuevo_nombre, capacidad = p_nueva_capacidad WHERE id = p_sala_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_user_profile` (IN `p_usuario_id` INT, IN `p_nuevo_nombre` VARCHAR(50), IN `p_nuevo_correo` VARCHAR(50), IN `p_nueva_contrasena` VARCHAR(50))   BEGIN
    UPDATE usuarios
    SET nombre = p_nuevo_nombre, correo = p_nuevo_correo, contrasena = p_nueva_contrasena
    WHERE id = p_usuario_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `asientos`
--

CREATE TABLE `asientos` (
  `id` int(11) NOT NULL,
  `sala_id` int(11) NOT NULL,
  `fila` int(11) NOT NULL,
  `columna` int(11) NOT NULL,
  `asignado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `asientos`
--

INSERT INTO `asientos` (`id`, `sala_id`, `fila`, `columna`, `asignado`) VALUES
(1, 1, 1, 1, 0),
(2, 1, 1, 2, 0),
(3, 1, 1, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `generos_peliculas`
--

CREATE TABLE `generos_peliculas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `generos_peliculas`
--

INSERT INTO `generos_peliculas` (`id`, `nombre`) VALUES
(1, 'Acción'),
(2, 'Comedia'),
(3, 'Drama'),
(4, 'Ciencia Ficción'),
(5, 'Aventura'),
(6, 'Animación'),
(7, 'Fantasía'),
(8, 'Suspenso'),
(9, 'Romance'),
(10, 'Documental');

-- --------------------------------------------------------

--
-- Table structure for table `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `sala_id` int(11) NOT NULL,
  `hora` time NOT NULL,
  `fecha` date NOT NULL,
  `pelicula_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `horarios`
--

INSERT INTO `horarios` (`id`, `sala_id`, `hora`, `fecha`, `pelicula_id`) VALUES
(1, 1, '18:00:00', '2023-12-12', 0),
(2, 2, '20:00:00', '2023-12-12', 0),
(3, 3, '22:00:00', '2023-12-12', 0),
(4, 1, '18:00:00', '2023-12-12', 0),
(5, 1, '20:00:00', '2023-12-12', 0),
(6, 1, '22:00:00', '2023-12-12', 0),
(7, 1, '18:00:00', '2023-12-12', 0),
(8, 1, '20:00:00', '2023-12-12', 0),
(9, 1, '22:00:00', '2023-12-12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `peliculas`
--

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text,
  `genero` varchar(50) DEFAULT NULL,
  `fecha_estreno` date DEFAULT NULL,
  `url_imagen` longtext NOT NULL,
  `status` int(5) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `peliculas`
--------------------------------------------------------

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
-- Table structure for table `salas`
--

CREATE TABLE `salas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `capacidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `salas`
--

INSERT INTO `salas` (`id`, `nombre`, `capacidad`) VALUES
(1, 'Sala 1', 40),
(2, 'Sala 2', 40),
(3, 'Sala 3', 40);

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
(15, 'JOHN', 'sample@tester.com', '3ea040427643a1960b0a7afd1a186974', 3),
(16, 'JOHN', 'sample2@tester.com', '3ea040427643a1960b0a7afd1a186974', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asientos`
--
ALTER TABLE `asientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sala_id` (`sala_id`);

--
-- Indexes for table `generos_peliculas`
--
ALTER TABLE `generos_peliculas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `salas`
--
ALTER TABLE `salas`
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
-- AUTO_INCREMENT for table `asientos`
--
ALTER TABLE `asientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `generos_peliculas`
--
ALTER TABLE `generos_peliculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `salas`
--
ALTER TABLE `salas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `asientos`
--
ALTER TABLE `asientos`
  ADD CONSTRAINT `asientos_ibfk_1` FOREIGN KEY (`sala_id`) REFERENCES `salas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
