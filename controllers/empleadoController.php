<?php
$conn = new mysqli("localhost", "admin", "admin", "assetsdb");//se crea la conexion a la base de datos con mysqli
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$consultaEmpleados = $conn->query( "SELECT * FROM empleado");//se ejecuta la consulta en la base de datos y se guarda

$empleados = [];

if ($consultaEmpleados->num_rows > 0) {//Translada la consulta de empleados y la cantidad hasta que ya no hayan 
    while ($empleado = $consultaEmpleados->fetch_assoc()) {
        $empleados[] = $empleado;
    }
}
echo json_encode($empleados);//Retorna como respuesta el arreglo de empleados en formato Json
$conn->close();
//fin de la conexion
?>
