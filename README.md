# SC502_2C2023_G3

En caso de usar una version vieja del DB actualizar la tabla empleados:

ALTER TABLE Empleado
MODIFY COLUMN CorreoEmpleado VARCHAR(50) NOT NULL,
ADD CONSTRAINT UC_CorreoEmpleado UNIQUE (CorreoEmpleado);

