<?php
require_once "../models/empleadoModel.php";
//require_once "../server.php";

class EmpleadoController {
    private $empleadoModel;

    public function __construct($empleadoModel) {
        $this->empleadoModel = $empleadoModel;
    }

    public function get_empleados() {
        $data = $this->empleadoModel->listar_empleados();
        
        header("Content-Type: application/json");
        echo json_encode($data);
    }
}

// Create an instance of the EmpleadoModel and EmpleadoController
$model = new EmpleadoModel($conn);
$controller = new EmpleadoController($model);

// Call the get_empleados function to generate the output
$controller->get_empleados();
?>