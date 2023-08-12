CREATE SCHEMA assetsdb;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON assetsdb.* TO 'admin'@'localhost';
use assetsdb;
CREATE TABLE Categoria(
IdCategoria INT PRIMARY KEY AUTO_INCREMENT,
NombreCategoria VARCHAR(50) NOT NULL
);
CREATE TABLE Entidad(
IdEntidad INT PRIMARY KEY AUTO_INCREMENT,
NumeroEntidad INT NOT NULL
);
CREATE TABLE Estado(
IdEstado INT PRIMARY KEY AUTO_INCREMENT,
_Estado ENUM ('active', 'inactive') NOT NULL
);
CREATE TABLE Empleado(
WWID INT PRIMARY KEY AUTO_INCREMENT,
NombreEmpleado VARCHAR(50) NOT NULL,
CorreoEmpleado VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE Activo (
    IdActivo INT PRIMARY KEY AUTO_INCREMENT,
    Serie VARCHAR(50) NOT NULL,
    Marca VARCHAR(50) NOT NULL,
    Tag INT NULL,
    PO VARCHAR(50) NULL,
    RAM VARCHAR(50) NULL,
    IdCategoria INT NOT NULL,
    IdEntidad INT NOT NULL,
    IdEstado INT NOT NULL,
    WWID INT NULL,
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(IdCategoria),
    FOREIGN KEY (IdEntidad) REFERENCES Entidad(IdEntidad),
    FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado),
    FOREIGN KEY (WWID) REFERENCES Empleado(WWID)
);
CREATE TABLE Usuario(
  IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
  NombreUsuario VARCHAR(50) NOT NULL,
  CorreoUsuario VARCHAR(50) NOT NULL UNIQUE,
  Contrasenna VARCHAR(50) NOT NULL,
  Tipo INT
);

CREATE TABLE Bitacora(
  IdBitacora INT PRIMARY KEY AUTO_INCREMENT,
  Fecha datetime NOT NULL,
  Accion VARCHAR(50) NOT NULL,
  Serie VARCHAR(50) NOT NULL,
  IdUsuario INT NOT NULL,
  FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);

INSERT INTO Categoria (NombreCategoria)
VALUES  ('Laptop'),
		('Monitor'),
		('Desktop');
        
INSERT INTO Entidad (NumeroEntidad)
VALUES  (230),
		(231),
		(232);
        
INSERT INTO Empleado (NombreEmpleado, CorreoEmpleado, WWID)
VALUES  ('Empleado1', 'e1@e',11111111),
		('Empleado2', 'e2@e',22222222),
		('Empleado3', 'e3@e',33333333),
        ('AssetLibre', 'null@null',99999999);

INSERT INTO Estado (_Estado)
VALUES  ('active'),
		('inactive');
        
INSERT INTO Usuario (NombreUsuario,  CorreoUsuario, Contrasenna, Tipo)
VALUES  ('SuperUser', '1@u', 'asd',3),
		('Usuario2', '2@u', 'asd',1),
		('Usuario3', '3@u', 'asd',1);
        
INSERT INTO Activo (Serie, Marca, Tag, PO, RAM, IdCategoria, IdEntidad, IdEstado, WWID)
VALUES  ('ADFSDG','Lenovo','1234','PO1341','13452',1,3,1,11111111),
		('PHSEFS','HP','1245','PO1352','13432',2,2,1,22222222),
        ('SEGSDG','Lenovo','1314','PO1134','13483',3,1,1,33333333);


/*/*drop schema assetsdb;
drop user 'admin'@'localhost';
*/



CREATE SCHEMA assetsdb;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON assetsdb.* TO 'admin'@'localhost';
use assetsdb;
CREATE TABLE Categoria(
IdCategoria INT PRIMARY KEY AUTO_INCREMENT,
NombreCategoria VARCHAR(50) NOT NULL
);
CREATE TABLE Entidad(
IdEntidad INT PRIMARY KEY AUTO_INCREMENT,
NumeroEntidad INT NOT NULL
);
CREATE TABLE Estado(
IdEstado INT PRIMARY KEY AUTO_INCREMENT,
_Estado ENUM ('active', 'inactive') NOT NULL
);
CREATE TABLE Empleado(
WWID INT PRIMARY KEY AUTO_INCREMENT,
NombreEmpleado VARCHAR(50) NOT NULL,
CorreoEmpleado VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE Activo (
    IdActivo INT PRIMARY KEY AUTO_INCREMENT,
    Serie VARCHAR(50) NOT NULL,
    Marca VARCHAR(50) NOT NULL,
    Tag INT NULL,
    PO VARCHAR(50) NULL,
    RAM VARCHAR(50) NULL,
    IdCategoria INT NOT NULL,
    IdEntidad INT NOT NULL,
    IdEstado INT NOT NULL,
    WWID INT NULL,
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(IdCategoria),
    FOREIGN KEY (IdEntidad) REFERENCES Entidad(IdEntidad),
    FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado),
    FOREIGN KEY (WWID) REFERENCES Empleado(WWID)
);
CREATE TABLE Usuario(
  IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
  NombreUsuario VARCHAR(50) NOT NULL,
  CorreoUsuario VARCHAR(50) NOT NULL UNIQUE,
  Contrasenna VARCHAR(50) NOT NULL,
  Tipo INT
);

CREATE TABLE Bitacora(
  IdBitacora INT PRIMARY KEY AUTO_INCREMENT,
  Fecha datetime NOT NULL,
  Accion VARCHAR(50) NOT NULL,
  Serie VARCHAR(50) NOT NULL,
  IdUsuario INT NOT NULL,
  FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);

INSERT INTO Categoria (NombreCategoria)
VALUES  ('Laptop'),
		('Monitor'),
		('Desktop');
        
INSERT INTO Entidad (NumeroEntidad)
VALUES  (230),
		(231),
		(232);
        
INSERT INTO Empleado (NombreEmpleado, CorreoEmpleado, WWID)
VALUES  ('Empleado1', 'e1@e',11111111),
		('Empleado2', 'e2@e',22222222),
		('Empleado3', 'e3@e',33333333),
        ('AssetLibre', 'null@null',99999999);

INSERT INTO Estado (_Estado)
VALUES  ('active'),
		('inactive');
        
INSERT INTO Usuario (NombreUsuario,  CorreoUsuario, Contrasenna, Tipo)
VALUES  ('SuperUser', '1@u', 'asd',3),
		('Usuario2', '2@u', 'asd',1),
		('Usuario3', '3@u', 'asd',1);
        
INSERT INTO Activo (Serie, Marca, Tag, PO, RAM, IdCategoria, IdEntidad, IdEstado, WWID)
VALUES  ('ADFSDG','Lenovo','1234','PO1341','13452',1,3,1,11111111),
		('PHSEFS','HP','1245','PO1352','13432',2,2,1,22222222),
        ('SEGSDG','Lenovo','1314','PO1134','13483',3,1,1,33333333);
        
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Listar_Categoria`()
BEGIN
    SELECT * FROM categoria;
END
$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Listar_Entidad`()
BEGIN
	select * from entidad;
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Listar_Estado`()
BEGIN
	select * from estado;
END
$$
DELIMITER ;

DELIMITER $$


CREATE DEFINER=`root`@`localhost` PROCEDURE `Listar_Usuarios`()
BEGIN
	select * from usuario;
END
$$
DELIMITER ;

use assetsdb;

DELIMITER $$
create DEFINER=`root`@`localhost` PROCEDURE `Registrar_Usuario`(
IN p_Nombre VARCHAR(50),
IN p_Correo VARCHAR(50),
IN p_Contrasenna VARCHAR(50))
BEGIN
	INSERT INTO usuario(NombreUsuario, CorreoUsuario, Contrasenna,Tipo)
    VALUES(p_Nombre, p_Correo, p_Contrasenna,1);
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Eliminar_Usuario`(
IN p_IdUsuario INT)
BEGIN
	DELETE FROM usuario where IdUsuario = p_IdUsuario;
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Editar_Usuario`(
IN p_Tipo INT,
IN p_IdUsuario INT)
BEGIN
	UPDATE usuario
    SET
    Tipo = p_Tipo
    WHERE IdUsuario = p_IdUsuario;
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Buscar_Usuario`(IN p_Correo VARCHAR(50))
BEGIN
	
    select * from usuario where CorreoUsuario = p_Correo;

END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Listar_Activos`()
BEGIN

	SELECT a.IdActivo, a.Serie, a.Marca, a.Tag, a.PO, a.RAM,
		   c.IdCategoria, c.NombreCategoria,
		   e.IdEntidad, e.NumeroEntidad,
		   es.IdEstado, es._Estado,
		   em.WWID, em.NombreEmpleado, em.CorreoEmpleado
	FROM assetsdb.activo a
	JOIN assetsdb.categoria c ON a.IdCategoria = c.IdCategoria
	JOIN assetsdb.entidad e ON a.IdEntidad = e.IdEntidad
	JOIN assetsdb.estado es ON a.IdEstado = es.IdEstado
	JOIN assetsdb.empleado em ON a.WWID = em.WWID;

END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Buscar_ActivoSerie`(IN p_Serie VARCHAR(50))
BEGIN
    SELECT * FROM activo WHERE Serie = p_Serie;
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Eliminar_ActivoId`(IN p_IdActivo INT)
BEGIN
    DELETE FROM assetsdb.activo WHERE IdActivo = p_IdActivo;
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Eliminar_ActivoSerie`(IN p_Serie VARCHAR(255))
BEGIN
    DELETE FROM assetsdb.activo WHERE Serie = p_Serie;
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Modificar_ActivoSerie`(
    IN p_Serie VARCHAR(255),
    IN p_Marca VARCHAR(255),
    IN p_Tag VARCHAR(255),
    IN p_PO VARCHAR(255),
    IN p_RAM VARCHAR(255),
    IN p_IdCategoria INT,
    IN p_IdEntidad INT,
    IN p_IdEstado INT,
    IN p_WWID INT
)
BEGIN
    UPDATE assetsdb.activo
    SET
        Marca = p_Marca,
        Tag = p_Tag,
        PO = p_PO,
        RAM = p_RAM,
        IdCategoria = p_IdCategoria,
        IdEntidad = p_IdEntidad,
        IdEstado = p_IdEstado,
        WWID = WWID
    WHERE
        Serie = p_Serie;
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Nuevo_Activo`(
    IN p_Serie VARCHAR(255),
    IN p_Marca VARCHAR(255),
    IN p_Tag VARCHAR(255),
    IN p_PO VARCHAR(255),
    IN p_RAM VARCHAR(255),
    IN p_IdCategoria INT,
    IN p_IdEntidad INT,
    IN p_IdEstado INT,
    IN p_WWID INT
)
BEGIN
    Insert into assetsdb.activo (
    Serie, Marca, Tag, PO, RAM, IdCategoria, IdEntidad,IdEstado, WWID
    )
	Values
        (p_Serie, p_Marca, p_Tag, p_PO, p_RAM, p_IdCategoria, p_IdEntidad, p_IdEstado, p_WWID);
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Registrar_Bitacora`(
    IN p_Accion VARCHAR(50),
    IN p_Serie VARCHAR(50),
    IN p_IdUsuario INT
)
BEGIN

	insert into assetsdb.Bitacora(Fecha, Accion, Serie, IdUsuario)
	values(NOW(), p_Accion, p_Serie, p_IdUsuario);
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Listar_Bitacora`()
BEGIN

select b.*, u.NombreUsuario from bitacora b
join usuario u on b.IdUsuario = u.IdUsuario;

END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Listar_Empleados`()
BEGIN

SELECT * FROM assetsdb.empleado;

END
$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Editar_Empleado`(
IN p_Nombre VARCHAR(50)
,IN p_Correo VARCHAR(50),
IN p_WWID INT)
BEGIN
	UPDATE empleado
    SET 
    NombreEmpleado = p_Nombre,
    CorreoEmpleado = p_Correo
    WHERE WWID = p_WWID;
END
$$

DELIMITER ;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Nuevo_Empleado`(
IN p_WWID INT,
IN p_Nombre VARCHAR(50),
IN p_Correo VARCHAR(50)
)
use assetsdb;
select * from activo;
BEGIN
	INSERT INTO empleado(
    WWID,
    NombreEmpleado,
    CorreoEmpleado
    ) 
    VALUES (
    p_WWID,
    p_Nombre,
    p_Correo)
END
$$
DELIMITER ;

call Nuevo_Empleado(22562222,'so','so@gmail.com');
DELIMITER ;
CALL Editar_Empleado('Chuz','mora',33333333);
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Eliminar_Empleado`(
IN p_WWID INT)
BEGIN
	DELETE FROM empleado
    WHERE WWID = p_WWID;
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Buscar_EmpleadoWWID`(
    IN p_WWID VARCHAR(50)
)
BEGIN
    SELECT * FROM empleado
    WHERE WWID = p_WWID;
END
$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Buscar_EmpleadoCorreo`(
    IN p_Correo VARCHAR(50)
)
BEGIN
    SELECT * FROM empleado
    WHERE CorreoEmpleado = p_Correo;
END
$$
DELIMITER ;
CALL Listar_empleados();
select * from usuario;
ALTER TABLE Empleado
MODIFY COLUMN CorreoEmpleado VARCHAR(50) NOT NULL,
ADD CONSTRAINT UC_CorreoEmpleado UNIQUE (CorreoEmpleado);
*/