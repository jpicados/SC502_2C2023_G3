<?php
require_once "../models/activoModel.php";
//require_once "../server.php";

class ActivoController {
    private $activoModel;

    public function __construct($activoModel) {
        $this->activoModel = $activoModel;
    }

    public function get_activos() {
        $data = $this->activoModel->listar_activos();
        
        header("Content-Type: application/json");
        echo json_encode($data);
    }
}

// Create an instance of the ActivoModel and ActivoController
$model = new ActivoModel($conn);
$controller = new ActivoController($model);

// Call the get_activos function to generate the output
$controller->get_activos();
?>