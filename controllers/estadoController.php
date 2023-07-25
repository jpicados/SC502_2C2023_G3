<?php
require_once "../models/estadoModel.php";
// require_once "../server.php";

class EstadoController {
    private $estadoModel;

    public function __construct($estadoModel) {
        $this->estadoModel = $estadoModel;
    }

    public function getEstados() {
        $estados = $this->estadoModel->listarEstados();
        header("Content-Type: application/json");
        echo json_encode($estados);
    }
}
    // Create an instance of the ActivoModel and ActivoController
$model = new EstadoModel($conn);
$controller = new EstadoController($model);

// Determine the action to perform based on the 'action' query parameter
$action = $_GET['action'] ?? '';
switch ($action) {
    case 'getEstados':
        $controller->getEstados();
        break;
    case 'null':
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