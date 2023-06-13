<?php
require_once "../models/activoModel.php";
class ActivoController {
    private $activoModel;

    public function __construct($activoModel) {
        $this->activoModel = $activoModel;
    }

    public function handleRequest() {
        $data = $this->activoModel->listarActivos();

        // Send the response as JSON
        header("Content-Type: application/json");
        echo json_encode($data);
    }
}
?>
