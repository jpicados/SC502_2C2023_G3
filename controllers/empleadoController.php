<?php
require_once "../models/empleadoModel.php";
//require_once "../server.php";

class empleadoController {
    private $empleadoModel;

    public function __construct($empleadoModel) {
        $this->empleadoModel = $empleadoModel;
    }

    public function get_empleados() {
        $empleados = $this->empleadoModel->get_empleados();

        // Send the response as JSON
        header("Content-Type: application/json");
        echo json_encode($empleados);
    }

    public function solicitudEmpleados() {
        $empleado = json_decode(file_get_contents("php://input"));
        // Acceder a las propiedades del usuario
        $nombre = $empleado->nombre;
        $correo = $empleado->correo;
        $wwid = $empleado->wwid;
        $empleados = $this->empleadoModel->nuevoEmpleado($nombre,$correo,$wwid);
        // Send the response as JSON
        header("Content-Type: application/json");
        echo json_encode($empleados);
    }
    // Create an instance of the EmpleadoModel and EmpleadoController
        
}
$model = new empleadoModel($conn);
$controller = new empleadoController($model);
// Call the get_empleados function to generate the output
$controller->get_empleados();


?>

