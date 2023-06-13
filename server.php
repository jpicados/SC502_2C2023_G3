<?php
$servername = "localhost";  // localhost
$username = "admin";  // usuario de mysql
$password = "admin";  // contrasena de mysql
$database = "assetsdb";  // base de datos

// crear coneccion
$conn = new mysqli($servername, $username, $password, $database);

// revisar coneccion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// select de activo
$sql = "SELECT * FROM activo";
$result = $conn->query($sql);

// fetch a un array
$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// enviar respuesta como json
header("Content-Type: application/json");
echo json_encode($data);

// cerrar coneccion
$conn->close();
?>
