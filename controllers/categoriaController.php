<?php
require_once "../models/categoriaModel.php";


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
    // Crea una instancia del ActivoModel y ActivoController
$model = new CategoriaModel($conn);
$controller = new CategoriaController($model);

// Determina la acción a realizar basada en el parámetro de consulta 'action'
$action = $_GET['action'] ?? '';
switch ($action) {
    case 'getCategorias':
        $controller->getCategorias();
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