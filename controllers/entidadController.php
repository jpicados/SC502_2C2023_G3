<?php
require_once "../models/entidadModel.php";
// require_once "../server.php";

class EntidadController {
    private $entidadModel;

    public function __construct($entidadModel) {
        $this->entidadModel = $entidadModel;
    }

    public function getEntidades() {
        $entidades = $this->entidadModel->listarEntidades();
        header("Content-Type: application/json");
        echo json_encode($entidades);
    }
}
    // Create an instance of the ActivoModel and ActivoController
$model = new EntidadModel($conn);
$controller = new EntidadController($model);

// Determine the action to perform based on the 'action' query parameter
$action = $_GET['action'] ?? '';
switch ($action) {
    case 'getEntidades':
        $controller->getEntidades();
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