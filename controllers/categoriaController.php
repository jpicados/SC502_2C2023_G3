<?php
require_once "../models/categoriaModel.php";
// require_once "../server.php";

class CategoriaController {
    private $categoriaModel;

    public function __construct($categoriaModel) {
        $this->categoriaModel = $categoriaModel;
   
    }

    public function getCategorias() {
        $categorias = $this->categoriaModel->listarCategorias();
        header("Content-Type: application/json");
        echo json_encode($categorias);
    
    }
}
    // Create an instance of the ActivoModel and ActivoController
$model = new CategoriaModel($conn);
$controller = new CategoriaController($model);

// Determine the action to perform based on the 'action' query parameter
$action = $_GET['action'] ?? '';
switch ($action) {
    case 'getCategorias':
        $controller->getCategorias();
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