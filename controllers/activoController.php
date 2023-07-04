<?php
require_once "../models/activoModel.php";
// require_once "../server.php";

class ActivoController {
    private $activoModel;

    public function __construct($activoModel) {
        $this->activoModel = $activoModel;
    }

    public function getActivos() {
        $data = $this->activoModel->listarActivos();
        header("Content-Type: application/json");
        echo json_encode($data);
    }

    public function buscarActivo($serie) {
        $data = $this->activoModel->buscarActivo($serie);
        header("Content-Type: application/json");
        echo json_encode($data);
    }
}

// Create an instance of the ActivoModel and ActivoController
$model = new ActivoModel($conn);
$controller = new ActivoController($model);

// Determine the action to perform based on the 'action' query parameter
$action = $_GET['action'] ?? '';
switch ($action) {
    case 'get_activos':
        $controller->getActivos();
        break;
    case 'buscar_activo':
        $serie = $_GET['serie'] ?? '';
        $controller->buscarActivo($serie);
        break;
    default:
        // Invalid action
        if (!empty($action) && method_exists($controller, $action)) {
            // Dynamic method invocation for custom actions
            $controller->{$action}();
        } else {
            echo json_encode(["error" => "Invalid action"]);
        }
        break;
}
?>
