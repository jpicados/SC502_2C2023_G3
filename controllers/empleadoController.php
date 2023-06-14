<?php
require_once "../models/empleadoModel.php";
class empleadoController {
    private $empleadoModel;

    public function __construct($empleadoModel) {
        $this->empleadoModel = $empleadoModel;
    }

    public function handleRequest() {
        $empleados = $this->empleadoModel->listarEmpleados();

        // Send the response as JSON
        header("Content-Type: application/json");
        echo json_encode($empleados);
    }

}


?>
