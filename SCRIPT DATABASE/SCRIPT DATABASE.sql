-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 15-10-2024 a las 18:37:46
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `PRUEBA`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EMPRESAS`
--

CREATE TABLE `EMPRESAS` (
  `EMPRESA_ID` int(11) NOT NULL,
  `NOMBRE` int(250) NOT NULL,
  `DIRECCION` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PROYECTOS`
--

CREATE TABLE `PROYECTOS` (
  `PROYECTO_ID` int(11) NOT NULL,
  `DESCRIPCION` varchar(250) NOT NULL,
  `NOMBRE` varchar(250) NOT NULL,
  `DIRECCION` varchar(250) NOT NULL,
  `TOTAL_OBRAS` int(11) NOT NULL,
  `CODIGO_SAP` varchar(250) NOT NULL,
  `ALMACEN` varchar(250) NOT NULL,
  `EMPRESA_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `EMPRESAS`
--
ALTER TABLE `EMPRESAS`
  ADD PRIMARY KEY (`EMPRESA_ID`);

--
-- Indices de la tabla `PROYECTOS`
--
ALTER TABLE `PROYECTOS`
  ADD PRIMARY KEY (`PROYECTO_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `EMPRESAS`
--
ALTER TABLE `EMPRESAS`
  MODIFY `EMPRESA_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `PROYECTOS`
--
ALTER TABLE `PROYECTOS`
  MODIFY `PROYECTO_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `PROYECTOS`
--
ALTER TABLE `PROYECTOS`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`EMPRESA_ID`) REFERENCES `EMPRESAS` (`EMPRESA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
