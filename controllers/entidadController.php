<?php
require_once "../models/entidadModel.php";

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
    // Crea una instancia del ActivoModel y ActivoController
$model = new EntidadModel($conn);
$controller = new EntidadController($model);

// Determina la acción a realizar basada en el parámetro de consulta 'action'
$action = $_GET['action'] ?? '';
switch ($action) {
    case 'getEntidades':
        $controller->getEntidades();
        break;
    case 'null':
        break;
    default:
        // Acción inválida
        if (!empty($action) && method_exists($controller, $action)) {
            // Invocación de método dinámico para acciones personalizadas
            $controller->{$action}();
        } else {
            echo json_encode(["error" => "Invalid action"]);
        }
        break;
}

?>