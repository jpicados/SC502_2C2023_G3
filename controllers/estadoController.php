<?php
require_once "../models/estadoModel.php";

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
    // Crea una instancia del ActivoModel y ActivoController
$model = new EstadoModel($conn);
$controller = new EstadoController($model);

// Determina la acción a realizar basada en el parámetro de consulta 'action'
$action = $_GET['action'] ?? '';
switch ($action) {
    case 'getEstados':
        $controller->getEstados();
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