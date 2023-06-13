<?php
//Conectamos a la base de datos
$conn = new mysqli("localhost", "admin", "admin", "assetsdb");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM empleado";

$result = $conn->query($sql);//total de empleados obtenidos 

$data = [];


if ($result->num_rows > 0) {//Translada el resultado de empleados y la cantidad hasta que ya no hayan 
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

header("Content-Type: application/json");
echo json_encode($data);//Retorna como respuesta el arreglo de empleados
$conn->close();
?>
