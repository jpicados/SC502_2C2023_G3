<?php
// $servername = "localhost";  // localhost
// $username = "admin";  // usuario de mysql
// $password = "admin";  // contrasena de mysql
// $database = "assetsdb";  // base de datos

// // crear coneccion
// $conn = new mysqli($servername, $username, $password, $database);

// // revisar coneccion
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }



// // enviar respuesta como json
// header("Content-Type: application/json");
// echo json_encode($data);

// // cerrar coneccion
// $conn->close();


//Nueva version de server

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

// Include the activoModel and activoController files
require_once "models/activoModel.php";
require_once "controllers/activoController.php";

// Create an instance of the activoModel
$activoModel = new ActivoModel($conn);

// Create an instance of the activoController
$activoController = new ActivoController($activoModel);

// Handle the request
$activoController->handleRequest();

// cerrar coneccion
$conn->close();
?>

