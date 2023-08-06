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
VALUES  ('SuperUser', '1@u', 'asd',2),
		('Usuario2', '2@u', 'asd',0),
		('Usuario3', '3@u', 'asd',0);
        
INSERT INTO Activo (Serie, Marca, Tag, PO, RAM, IdCategoria, IdEntidad, IdEstado, WWID)
VALUES  ('ADFSDG','Lenovo','1234','PO1341','13452',1,3,1,11111111),
		('PHSEFS','HP','1245','PO1352','13432',2,2,1,22222222),
        ('SEGSDG','Lenovo','1314','PO1134','13483',3,1,1,33333333);