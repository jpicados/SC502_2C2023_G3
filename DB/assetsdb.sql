-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2023 at 03:34 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assetsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `activo`
--

CREATE TABLE `activo` (
  `IdActivo` int(11) NOT NULL,
  `Serie` varchar(50) NOT NULL,
  `Marca` varchar(50) NOT NULL,
  `Tag` int(11) DEFAULT NULL,
  `PO` varchar(50) DEFAULT NULL,
  `RAM` varchar(50) DEFAULT NULL,
  `IdCategoria` int(11) NOT NULL,
  `IdEntidad` int(11) DEFAULT NULL,
  `IdEstado` int(11) DEFAULT NULL,
  `IdEmpleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activo`
--

INSERT INTO `activo` (`IdActivo`, `Serie`, `Marca`, `Tag`, `PO`, `RAM`, `IdCategoria`, `IdEntidad`, `IdEstado`, `IdEmpleado`) VALUES
(1, 'ADFSDG', 'Lenovo', 1234, 'PO1341', '13452', 1, 3, 1, 1),
(2, 'PHSEFS', 'HP', 1245, 'PO1352', '13432', 2, 2, 1, 2),
(3, 'SEGSDG', 'Lenovo', 1314, 'PO1134', '13483', 3, 1, 1, 3),
(4, 'ADFSDG', 'Lenovo', 2452, 'PO3241', '24523', 2, 3, 1, 1),
(5, 'ADFSDG', 'Lenovo', 2452, 'PO3241', '24523', 2, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `IdCategoria` int(11) NOT NULL,
  `NombreCategoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`IdCategoria`, `NombreCategoria`) VALUES
(1, 'Laptop'),
(2, 'Monitor'),
(3, 'Desktop');

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

CREATE TABLE `empleado` (
  `IdEmpleado` int(11) NOT NULL,
  `NombreEmpleado` varchar(50) NOT NULL,
  `CorreoEmpleado` varchar(50) DEFAULT NULL,
  `WWID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `empleado`
--

INSERT INTO `empleado` (`IdEmpleado`, `NombreEmpleado`, `CorreoEmpleado`, `WWID`) VALUES
(1, 'Empleado1', 'e1@e', 11111111),
(2, 'Empleado2', 'e2@e', 22222222),
(3, 'Empleado3', 'e3@e', 33333333);

-- --------------------------------------------------------

--
-- Table structure for table `entidad`
--

CREATE TABLE `entidad` (
  `IdEntidad` int(11) NOT NULL,
  `NumeroEntidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entidad`
--

INSERT INTO `entidad` (`IdEntidad`, `NumeroEntidad`) VALUES
(1, 230),
(2, 231),
(3, 232);

-- --------------------------------------------------------

--
-- Table structure for table `estado`
--

CREATE TABLE `estado` (
  `IdEstado` int(11) NOT NULL,
  `_Estado` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `estado`
--

INSERT INTO `estado` (`IdEstado`, `_Estado`) VALUES
(1, 'active'),
(2, 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `IdUsuario` int(11) NOT NULL,
  `NombreUsuario` varchar(50) NOT NULL,
  `CorreoUsuario` varchar(50) NOT NULL,
  `Contrasenna` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `NombreUsuario`, `CorreoUsuario`, `Contrasenna`) VALUES
(1, 'Usuario1', 'u1@u', 'asd'),
(2, 'Usuario2', 'u2@u', 'asd'),
(3, 'Usuario3', 'u3@u', 'asd');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activo`
--
ALTER TABLE `activo`
  ADD PRIMARY KEY (`IdActivo`),
  ADD KEY `IdCategoria` (`IdCategoria`),
  ADD KEY `IdEntidad` (`IdEntidad`),
  ADD KEY `IdEstado` (`IdEstado`),
  ADD KEY `IdEmpleado` (`IdEmpleado`);

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`IdCategoria`);

--
-- Indexes for table `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`IdEmpleado`);

--
-- Indexes for table `entidad`
--
ALTER TABLE `entidad`
  ADD PRIMARY KEY (`IdEntidad`);

--
-- Indexes for table `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`IdEstado`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD UNIQUE KEY `CorreoUsuario` (`CorreoUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activo`
--
ALTER TABLE `activo`
  MODIFY `IdActivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `IdCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `empleado`
--
ALTER TABLE `empleado`
  MODIFY `IdEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `entidad`
--
ALTER TABLE `entidad`
  MODIFY `IdEntidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `estado`
--
ALTER TABLE `estado`
  MODIFY `IdEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activo`
--
ALTER TABLE `activo`
  ADD CONSTRAINT `activo_ibfk_1` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`),
  ADD CONSTRAINT `activo_ibfk_2` FOREIGN KEY (`IdEntidad`) REFERENCES `entidad` (`IdEntidad`),
  ADD CONSTRAINT `activo_ibfk_3` FOREIGN KEY (`IdEstado`) REFERENCES `estado` (`IdEstado`),
  ADD CONSTRAINT `activo_ibfk_4` FOREIGN KEY (`IdEmpleado`) REFERENCES `empleado` (`IdEmpleado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
